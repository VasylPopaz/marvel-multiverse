import {
  hulk2_desk1x,
  hulk2_desk2x,
  hulk2_tab1x,
  hulk2_tab2x,
  hulk_desk1x,
  hulk_desk2x,
  hulk_tab1x,
  hulk_tab2x,
  panther2_desk1x,
  panther2_desk2x,
  panther2_mob1x,
  panther2_mob2x,
  panther2_tab1x,
  panther2_tab2x,
  panther_desk1x,
  panther_desk2x,
  panther_mob1x,
  panther_mob2x,
  panther_tab1x,
  panther_tab2x,
  spiderMan2_desk1x,
  spiderMan2_desk2x,
  spiderMan2_tab1x,
  spiderMan2_tab2x,
  spiderMan_desk1x,
  spiderMan_desk2x,
  spiderMan_tab1x,
  spiderMan_tab2x,
} from "../assets";

export const heroes = [
  {
    title: "Black Panther",
    description:
      "T’Challa is the king of the secretive and highly advanced African nation of Wakanda - as well as the powerful warrior known as the Black Panther.",
    images: {
      mob: [panther_mob1x, panther_mob2x],
      tab: [panther_tab1x, panther_tab2x],
      desk: [panther_desk1x, panther_desk2x],
    },
    bgImages: {
      mob: [panther2_mob1x, panther2_mob2x],
      tab: [panther2_tab1x, panther2_tab2x],
      desk: [panther2_desk1x, panther2_desk2x],
    },
    colors: {
      primary: "#34387f",
      gradient:
        "radial-gradient(81.15% 81.15% at 50% 18.85%, rgb(52, 56, 127) 0%, rgb(23, 23, 23) 100%)",
    },
  },

  {
    title: "Spider Man",
    description:
      "With amazing spider-like abilities, teenage science whiz Peter Parker fights crime and dreams of becoming an Avenger as Spider-Man.",
    images: {
      mob: [spiderMan_tab1x, spiderMan_tab2x],
      tab: [spiderMan_tab1x, spiderMan_tab2x],
      desk: [spiderMan_desk1x, spiderMan_desk2x],
    },
    bgImages: {
      mob: [spiderMan2_tab1x, spiderMan2_tab2x],
      tab: [spiderMan2_tab1x, spiderMan2_tab2x],
      desk: [spiderMan2_desk1x, spiderMan2_desk2x],
    },
    colors: {
      primary: "#600404",
      gradient:
        "radial-gradient(81.15% 81.15% at 50% 18.85%, rgb(96, 4, 4) 0%, rgb(23, 23, 23) 100%)",
    },
  },
  {
    title: "Hulk",
    description:
      "Exposed to heavy doses of gamma radiation, scientist Bruce Banner transforms into the mean, green rage machine called the Hulk.",
    images: {
      mob: [hulk_tab1x, hulk_tab2x],
      tab: [hulk_tab1x, hulk_tab2x],
      desk: [hulk_desk1x, hulk_desk2x],
    },
    bgImages: {
      mob: [hulk2_tab1x, hulk2_tab2x],
      tab: [hulk2_tab1x, hulk2_tab2x],
      desk: [hulk2_desk1x, hulk2_desk2x],
    },
    colors: {
      primary: "#5B7F3C",
      gradient:
        "radial-gradient(81.15% 81.15% at 50% 18.85%, rgb(91, 127, 60) 0%, rgb(23, 23, 23) 100%)",
    },
  },
];
