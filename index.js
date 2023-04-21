import BankConnection from "./lib/v1/bankConnection";
import BankTransaction from "./lib/v1/bankTransaction";
import ContactCompany from "./lib/v1/contactCompany";
import ContactCompanyPerson from "./lib/v1/contactCompanyPerson";
import ExpenseVoucher from "./lib/v1/expenseVoucher";
import IncomeEstimate from "./lib/v1/incomeEstimate";
import IncomeInvoice from "./lib/v1/incomeInvoice";
import IncomeProposition from "./lib/v1/incomeProposition";
import Info from "./lib/v1/info";
import Project from "./lib/v1/project";
import TrackerTask from "./lib/v1/trackerTask";
import TrackerTimeEntry from "./lib/v1/trackerTimeEntry";

class PapierkramApiClientV1 {
  constructor(subdomain, token) {
    this.subdomain = subdomain;
    this.token = token;
    this.name = "Client";

    this.v1 = {
      bankConnection: new BankConnection(this),
      bankTransaction: new BankTransaction(this),
      contactCompany: new ContactCompany(this),
      contactCompanyPerson: new ContactCompanyPerson(this),
      expenseVoucher: new ExpenseVoucher(this),
      incomeEstimate: new IncomeEstimate(this),
      incomeInvoice: new IncomeInvoice(this),
      incomeProposition: new IncomeProposition(this),
      info: new Info(this),
      project: new Project(this),
      trackerTask: new TrackerTask(this),
      trackerTimeEntry: new TrackerTimeEntry(this),
      quota(request) {
        return request;
      },
      buildBaseUri: (path) => {
        let url = `https://${this.subdomain}.papierkram.de/api/v1`;
        if (process.env.TALKBACK) {
          url = `http://localhost:8080/api/v1`;
        }
        return `${url}${path}`;
      },
    };
  }
}

export default PapierkramApiClientV1;
