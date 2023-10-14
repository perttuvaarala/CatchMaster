import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./api/schema/";
import resolvers from "./api/resolvers/";
import mongoConnect from "./utils/db";
import express from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import http from "http";
import passport from "passport";
import { config } from "./utils/config";
import userModel, { User } from "./api/models/userModel";
import cors from "cors";
import { json } from "body-parser";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

export type TContext = {
	user?: User;
};

passport.use(
	new GoogleStrategy(
		{
			clientID: config.GOOGLE_CLIENT_ID,
			clientSecret: config.GOOGLE_CLIENT_SECRET,
			callbackURL: config.GOOGLE_CALLBACK_URL,
		},
		async function (_accessToken, _refreshToken, profile, cb) {
			if (!profile?.emails?.[0]) {
				return cb(new Error("No email found"));
			}

			const user = await userModel.findOne({
				email: profile.emails[0].value,
			});

			if (user) {
				return cb(null, user);
			}

			const newUser = await userModel.create({
				username: profile.displayName,
				email: profile.emails[0].value,
			});

			return cb(null, newUser);
		},
	),
);

passport.serializeUser(function (user, done) {
	const email = (user as User)?.email;
	if (email) {
		return done(null, email);
	}
	done("no email", null);
});

passport.deserializeUser(async function (email: string, done) {
	const user = await userModel.findOne({ email });
	if (user) {
		return done(null, user);
	}
	done("no user", null);
});

const startServer = async () => {
	await mongoConnect();

	const app = express();
	const httpServer = http.createServer(app);

	const server = new ApolloServer<TContext>({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	const corsOptions = {
		origin: config.APP_URL,
		methods: ["GET", "POST"],
		credentials: true,
		optionsSuccessStatus: 204,
	};

	await server.start();

	app.use(
		session({
			secret: config.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
		}),
	);
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(
		"/graphql",
		cors<cors.CorsRequest>(corsOptions),
		json(),
		expressMiddleware(server, {
			context: async ({ req }): Promise<TContext> => {
				return { user: req.user as User | undefined };
			},
		}),
	);

	app.get(
		"/auth/google",
		cors<cors.CorsRequest>(corsOptions),
		passport.authenticate("google", { scope: ["profile", "email"] }),
	);

	app.get(
		"/auth/google/callback",
		cors<cors.CorsRequest>(corsOptions),
		passport.authenticate("google", { failureRedirect: config.APP_URL }),
		(req, res) => {
			console.log("Cookie onnistui")
			res.cookie(config.SESSION_COOKIE_NAME, req.sessionID, {
				httpOnly: true,
				sameSite: "none",
				secure: true,
				domain: config.SESSION_COOKIE_DOMAIN
			});
			res.redirect(config.APP_URL);
		},
	);

	httpServer.listen({ port: config.PORT }, () =>
		console.log(`🚀 Server ready at port ${config.PORT}`),
	);
};

startServer();
