import { join } from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import talkback from "talkback";
let talkbackInstance;

function traverse(obj, func) {
  for (var i in obj) {
    func.apply(this, [i, obj[i], obj]);
    if (obj[i] !== null && typeof obj[i] === "object") {
      traverse(obj[i], func);
    } else if (obj[i] !== null && typeof obj[i] === "array") {
      obj[i].forEach((item) => traverse(item, func));
    }
  }
}

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

        const tapeBody = JSON.parse(tape.res.body);

        traverse(tapeBody, function (key, value, obj) {
          if (key === "type") {
            if (obj[key] === "banking_transaction" && obj["usage"]) {
              obj["usage"] = "<USAGE>";
            }
            if (obj[key] === "banking_transaction" && obj["purpose"]) {
              obj["purpose"] = "<PURPOSE>";
            }
            if (obj[key] === "banking_transaction" && obj["value"]) {
              obj["value"] = "<VALUE_TYPE_NUMBER>";
            }
          }

          if (key === "saldo") {
            if (obj[key]["value"]) {
              obj[key]["value"] = "<SALDO-TYPE-NUMBER>";
            }
          }

          if (key === "email") {
            obj[key] = "<EMAIL>";
          }
          if (key === "sent_to") {
            obj[key] = "<EMAIL>";
          }
          if (key === "password") {
            obj[key] = "<PASSWORD>";
          }
          if (key === "password_confirmation") {
            obj[key] = "<PASSWORD>";
          }
          if (key === "blz") {
            obj[key] = "<BLZ>";
          }
          if (key === "bic") {
            obj[key] = "<BIC>";
          }
          if (key === "bank_bic") {
            obj[key] = "<BIC>";
          }
          if (key === "bank_iban") {
            obj[key] = "<BANK_IBAN>";
          }
          if (key === "bank_sepa_mandate_reference") {
            obj[key] = "<SEPA_REF>";
          }
          if (key === "iban") {
            obj[key] = "<IBAN>";
          }
          if (key === "account_number") {
            obj[key] = "<ACCOUNT_NUMBER>";
          }
          if (key === "bank_account_no") {
            obj[key] = "<ACCOUNT_NO>";
          }
          if (key === "phone") {
            obj[key] = "<PHONE>";
          }
          if (key === "mobile") {
            obj[key] = "<MOBILE>";
          }
          if (key === "fax") {
            obj[key] = "<FAX>";
          }
        });

        const newBody = JSON.stringify(tapeBody);
        tape.res.body = Buffer.from(newBody);
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
