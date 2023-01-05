// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Stackup Docs",
  tagline:
    "Developer tools and infrastructure for building Web3 apps with smart contract accounts.",
  url: "https://docs.stackup.sh",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "stackup-wallet", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/stackup-wallet/tree/main/apps/docs",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/stackup-wallet/tree/main/apps/docs",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: process.env.GTAG_TRACKING_ID && {
          trackingID: process.env.GTAG_TRACKING_ID,
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Stackup",
        logo: {
          alt: "Stackup Developer documentation",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "introduction/account-abstraction",
            position: "left",
            label: "Docs",
          },
          {
            href: "https://www.stackup.sh",
            label: "Website",
            position: "right",
          },
          {
            href: "https://www.github.com/stackup-wallet",
            label: "GitHub",
            position: "right",
          },
          {
            href: "https://eips.ethereum.org/EIPS/eip-4337",
            label: "EIP-4337",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Get Started",
                to: "/docs/guides/quickstart",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Twitter",
                href: "https://www.twitter.com/stackup_fi",
              },
              {
                label: "Discord",
                href: "https://discord.gg/FpXmvKrNed",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Website",
                href: "https://www.stackup.sh",
              },
              {
                label: "GitHub",
                href: "https://www.github.com/stackup-wallet",
              },
              {
                label: "E-mail",
                href: "mailto:founders@stackup.sh",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Stackup.`,
      },
      metadata: [
        {
          property: "og:title",
          content: "Stackup Developer Docs",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:image",
          content: "https://i.imgur.com/hNJp1R1.png",
        },
        {
          property: "og:description",
          content:
            "Stackup provides ERC-4337 infrastructure, tools, and APIs for teams to build Web3 apps with smart contract accounts.",
        },
        {
          property: "og:site_name",
          content: "Stackup Developer Docs",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:image:alt",
          content: "Stackup logotype",
        },
        {
          name: "twitter:site",
          content: "@stackup_fi",
        },
      ],
      colorMode: {
        defaultMode: "dark",
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["solidity"],
      },
    }),
};

module.exports = config;
