import { join } from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import talkback from "talkback";
let talkbackInstance;

function talkbackStart() {
  if (!talkbackInstance) {
    talkbackInstance = talkback({
      host: `https://${process.env.PAPIERKRAM_API_SUBDOMAIN}.papierkram.de`,
      name: "Papierkram API V1",
      path: __dirname + "/tapes",
      port: 8080,
      ignoreHeaders: true,
      allowHeaders: ["accept", "content-type", "method", "remaining-quota"],
      tapeNameGenerator: function nameGenerator(tapeNumber, tape) {
        return join(
          `${tape.req.method}${tape.req.url.replaceAll("/", "_")}-${tapeNumber}`
        );
      },
      tapeDecorator: function tapeDecorator(tape, context) {
        if (tape.req.headers.authorization) {
          const bearer = tape.req.headers.authorization.split("Bearer ");
          bearer[1] = "<BEARER-AUTH>";
          tape.req.headers.authorization = bearer.join("Bearer ");
        }
        if (tape.res.headers["set-cookie"]) {
          tape.res.headers["set-cookie"] = "<SET-COOKIE>";
        }

        return tape;
      },
      record: process.env.TALKBACK_NEW_TAPES || "NEW",
      fallbackMode: process.env.TALKBACK_NEW_TAPES_FALLBACK || "PROXY",
    });

    talkbackInstance.start();
  }

  return talkbackInstance;
}

export default talkbackStart;
