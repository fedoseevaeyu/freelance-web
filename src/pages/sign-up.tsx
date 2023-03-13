import { withIronSessionSsr } from "iron-session/next";

import Layout from "@app/layout";
import Content from "@app/(auth)/sign-up/page";
import { sessionOptions } from "@lib/session";
import Route from "config/routes";

export default function Page() {
  return (
    <Layout>
      <Content />
    </Layout>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;

  if (user !== undefined) {
    res.setHeader("location", Route.My);
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {},
  };
}, sessionOptions);
