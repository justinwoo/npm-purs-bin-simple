"use strict";

const process = require("process");
const https = require("follow-redirects").https;
const tar = require("tar");
const shell = require("shelljs");
const version = process.env.PURS_VERSION || require("./package.json")["purs-version"];
const platform = { win32: "win64", darwin: "macos" }[process.platform] || "linux64";

https.get(
  `https://github.com/purescript/purescript/releases/download/${version}/${platform}.tar.gz`,
  res => res.pipe(
      tar.x({"C": 'purs', strip: 1}).on("finish", () => {
        if (shell.test("-f", "./purs/purs")) {
          shell.mv("./purs/purs", "./purs/purs.exe")
        }
      })
    )
);
