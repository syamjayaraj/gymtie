import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Discover GymTie, the ultimate gym management app. Streamline your operations, protect your data with our cloud database, and stay ahead with cutting-edge technology. Manage your gym like a pro with GymTie."
        />
        <meta
          name="keywords"
          content="GymTie, gym management, cloud database, cutting-edge technology, fitness business"
        />
        <meta name="author" content="GymTie" />
        <meta name="robots" content="index, follow" />
        <meta
          name="og:title"
          property="og:title"
          content="GymTie | Elevate Your Gym Management Experience"
        />
        <meta
          name="og:description"
          property="og:description"
          content="Discover GymTie, the ultimate gym management app. Streamline your operations, protect your data with our cloud database, and stay ahead with cutting-edge technology. Manage your gym like a pro with GymTie."
        />
        {/* <meta
          name="og:image"
          property="og:image"
          content="https://gymtie.com/your-image.jpg"
        /> */}
        <meta name="og:url" property="og:url" content="https://gymtie.com" />
        <meta name="og:site_name" property="og:site_name" content="GymTie" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <meta
          name="twitter:title"
          content="GymTie | Elevate Your Gym Management Experience"
        />
        <meta
          name="twitter:description"
          content="Discover GymTie, the ultimate gym management app. Streamline your operations, protect your data with our cloud database, and stay ahead with cutting-edge technology. Manage your gym like a pro with GymTie."
        />
        {/* <meta
          name="twitter:image"
          content="https://gymtie.com/your-image.jpg"
        /> */}
        <title>GymTie | Elevate Your Gym Management Experience</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
