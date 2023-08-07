# papierkram-api-client<!-- omit from toc -->

Der erste ~~illegale~~ nicht offizielle Papierkram-Client für die Papierkram-API für NodeJS.

[![Node.js current](https://github.com/simonneutert/papierkram-api-client/actions/workflows/node-current.yml/badge.svg?branch=main&event=push)](https://github.com/simonneutert/papierkram-api-client/actions/workflows/node-current.yml) [![Node.js legacy](https://github.com/simonneutert/papierkram-api-client/actions/workflows/node-legacy.yml/badge.svg?branch=main&event=push)](https://github.com/simonneutert/papierkram-api-client/actions/workflows/node-legacy.yml)

<img src="pac_logo_js.svg" alt="Gleiches Logo wie Ruby Version, nur Frosch hat Knoten in der Zunge, der wie ein j und ein s aussieht. Das ist lustig, weil zufällig die Software in JavScript geschrieben ist :D" width="300">

🚧 🛠️ Dieses Projekt befindet sich noch in der Entwicklung und ist eher noch nicht für die Verwendung geeignet. 🛠️ 🚧  
Aber du kannst es gerne ausprobieren und mir Feedback geben.

Hier geht es zu den [offiziellen API Docs](https://demo.papierkram.de/api/v1/api-docs/index.html).  
Schau bitte dort um alle Rückgabefelder/-werte zu checken, bis ich die Dokumentation hier komplett habe.

## NodeJS Version<!-- omit from toc -->

- Dieser Client benötigt **NodeJS 16+**.  
  Denn wer Node v14.x benutzt sollte nicht noch mit neuen Packages dafür belohnt werden 🤡

### Hinweis WIP<!-- omit from toc -->

🚨 In Kürze wird es eine neue Version geben, mit mehr tests, allen Endpunkten und einer ausführlichen Dokumentation. 🤞

> Ich bin eigentlich Ruby-Entwickler und habe mich entschieden, diesen Client in NodeJS zu schreiben, um mich nach einer langen Zeit mal wieder mit JavaScript zu beschäftigen. 😅
>
> Siehe [Papierkram API Client für Ruby](https://github.com/simonneutert/papierkram_api_client).

**Aktuell unterstützte Endpunkte / Objekte:**  
🚨 global noch kein Support für PDF-Downloads. 🚨

- [x] Banking::BankConnection
- [x] Banking::BankTransaction
- [x] Contact::Company (Unternehmen)
- [x] Contact::Company (Kontaktpersonen)
- [x] Expense::Voucher (Ausgabe Belege)
- [x] Income::Estimate (Angebote)
- [x] Income::Invoice (Rechnungen)
- [x] Income::Proposition (Waren / Dienstleistungen)
- [x] Info
- [x] Project (Projekte)
- [x] Tracker::Task (Aufgaben)
- [x] Tracker::TimeEntry (Zeiterfassung)

## Inhaltsverzeichnis<!-- omit from toc -->

- [Installation](#installation)
- [Verwendung](#verwendung)
- [Endpunkte V1](#endpunkte-v1)
  - [Banking::BankConnection (Bankverbindungen)](#bankingbankconnection-bankverbindungen)
    - [Alle Bankverbindungen](#alle-bankverbindungen)
    - [Eine bestimmte Bankverbindung](#eine-bestimmte-bankverbindung)
  - [Banking::BankTransaction (Banktransaktionen)](#bankingbanktransaction-banktransaktionen)
    - [Alle Banktransaktionen](#alle-banktransaktionen)
    - [Eine bestimmte Banktransaktion](#eine-bestimmte-banktransaktion)
  - [Contact::Company (Unternehmen)](#contactcompany-unternehmen)
    - [Alle Unternehmen](#alle-unternehmen)
    - [Ein bestimmtes Unternehmen](#ein-bestimmtes-unternehmen)
  - [Contact::Company (Kontaktpersonen)](#contactcompany-kontaktpersonen)
    - [Alle Kontaktpersonen eines Unternehmens](#alle-kontaktpersonen-eines-unternehmens)
    - [Eine Kontaktperson eines Unternehmens](#eine-kontaktperson-eines-unternehmens)
  - [Expense::Voucher (Ausgabebelege)](#expensevoucher-ausgabebelege)
    - [Ein bestimmter Ausgabebeleg](#ein-bestimmter-ausgabebeleg)
  - [Income::Estimate (Angebote)](#incomeestimate-angebote)
    - [Alle Angebote](#alle-angebote)
    - [Ein bestimmtes Angebot](#ein-bestimmtes-angebot)
  - [Income::Invoice (Rechnungen)](#incomeinvoice-rechnungen)
    - [Alle Rechnungen](#alle-rechnungen)
    - [Eine bestimmte Rechnung](#eine-bestimmte-rechnung)
  - [Income::Proposition (Waren / Dienstleistungen)](#incomeproposition-waren--dienstleistungen)
    - [Alle Waren / Dienstleistungen](#alle-waren--dienstleistungen)
    - [Eine bestimmte Ware / Dienstleistung](#eine-bestimmte-ware--dienstleistung)
  - [Info](#info)
  - [Project (Projekte)](#project-projekte)
    - [Alle Projekte](#alle-projekte)
    - [Ein bestimmtes Projekt](#ein-bestimmtes-projekt)
    - [Neues Projekt erstellen](#neues-projekt-erstellen)
    - [Update eines Projekts](#update-eines-projekts)
    - [Archivieren eines Projekts](#archivieren-eines-projekts)
    - [Unarchivieren eines Projekts](#unarchivieren-eines-projekts)
    - [Löschen eines Projekts](#löschen-eines-projekts)
  - [Tracker::Task (Aufgaben)](#trackertask-aufgaben)
    - [Alle Aufgaben](#alle-aufgaben)
    - [Eine bestimmte Aufgabe](#eine-bestimmte-aufgabe)
  - [Tracker::TimeEntry (Zeiteinträge)](#trackertimeentry-zeiteinträge)
    - [Alle Zeiteinträge](#alle-zeiteinträge)
    - [Einen Zeiteintrag](#einen-zeiteintrag)
- [Configuration](#configuration)
- [Tests](#tests)
  - [VSCode](#vscode)

---

## Installation

```bash
npm install papierkram-api-client
```

## Verwendung

alle Verbindungen zu Endpunkten sind so gestaltet, dass du Config-Optionen übergeben kannst.

Beispiele für Config-Optionen entsprechen den Parametern, die du in der Papierkram-API-Dokumentation findest.

```js
client.v1.banking.bankConnection
  .all({ page: 2, pageSize: 50 })
  .then((bankConnections, err) => {
    console.log(bankConnections.status);
    console.log(bankConnections.headers);
    console.log(bankConnections.body);
    console.log(bankConnections.remainingQuota);
  });
```

oder:

```javascript
// async/await
await const { headers, body } = client.v1.banking.incomeInvoice.all({
  page: 2,
  pageSize: 50,
  orderBy: "total_net",
  orderDirection: "desc"
});
```

```js
// promise syntax
const PapierkramApiClient = require("papierkram-api-client");
const client = new PapierkramApiClient("deine-subdomain", "DEIN-API_KEY");

client.v1.incomeInvoice.all().then((invoices, err) => {
  console.log(invoices);
  console.log(invoices.status);
  console.log(invoices.headers);
  console.log(invoices.body);
  console.log(invoices.remainingQuota);
});
```

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "list",
  "page": 1,
  "page_size": 100,
  "total_pages": 1,
  "total_entries": 2,
  "has_more": false,
  "entries": [
    {
      "type": "invoice",
      "id": 539,
      "name": "My invoice",
      "description": "Notes for the invoice",
      "document_date": "2020-05-01",
      "due_date": "2020-05-31",
      "supply_date": "2023-04-04 10:14:22 +0200",
      "customer_no": null,
      "invoice_no": "R-INC",
      "sent_on": null,
      "sent_via": null,
      "sent_to": null,
      "paid_at_date": null,
      "state": "paid",
      "record_state": "active",
      "custom_template": null,
      "total_net": 200,
      "total_vat": 26,
      "total_gross": 226,
      "billing": {
        "company": "Mustermann Automobile GmbH",
        "email": null,
        "ust_idnr": "11/234/34567",
        "street": "Dotzheimer Str. 36",
        "zip": "65185",
        "city": "Wiesbaden",
        "country": "Deutschland",
        "contact_person": "John Doe",
        "department": "Purchasing"
      }
    },
    {
      "type": "invoice",
      "id": 540,
      "name": null,
      "description": null,
      "document_date": "2023-04-04",
      "due_date": "2023-04-04",
      "supply_date": "2023-04-04 10:14:22 +0200",
      "customer_no": null,
      "invoice_no": "R-INC",
      "sent_on": null,
      "sent_via": null,
      "sent_to": null,
      "paid_at_date": null,
      "state": "paid",
      "record_state": "active",
      "custom_template": null,
      "total_net": 0,
      "total_vat": 0,
      "total_gross": 0,
      "billing": {
        "company": "Mustermann Automobile GmbH",
        "email": null,
        "ust_idnr": null,
        "street": "Dotzheimer Str. 36",
        "zip": "65185",
        "city": "Wiesbaden",
        "country": "Deutschland",
        "contact_person": "Max Mustermann",
        "department": null
      }
    }
  ]
}
```

</details>

## Endpunkte V1

### Banking::BankConnection (Bankverbindungen)

#### Alle Bankverbindungen

```js
client.v1.bankConnection.all({}).then((bankConnections, err) => {
  console.log(bankConnections);
});
```

#### Parameter<!-- omit in toc -->

| Parameter      | Typ     | Beschreibung                  |
| -------------- | ------- | ----------------------------- |
| page           | Integer | Seite                         |
| pageSize       | Integer | Anzahl der Elemente pro Seite |
| orderBy        | String  | Sortierung                    |
| orderDirection | String  | Sortierungsrichtung           |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "list",
  "page": 1,
  "page_size": 100,
  "total_pages": 1,
  "total_entries": 2,
  "has_more": false,
  "entries": [
    {
      "type": "bank_connection",
      "id": 464,
      "name": "Standard"
    },
    {
      "type": "bank_connection",
      "id": 465,
      "name": "Testbank"
    }
  ]
}
```

</details>

#### Eine bestimmte Bankverbindung

```js
client.v1.bankConnection.by({ id: 464 }).then((bankConnection, err) => {
  console.log(bankConnection);
});
```

#### Parameter<!-- omit in toc -->

| Parameter | Typ     | Beschreibung |
| --------- | ------- | ------------ |
| id        | Integer | ID           |

 <details>

 <summary>Beispielantwort für `body`</summary>

```json
{
  "type": "bank_connection",
  "id": 466,
  "name": "Testbank",
  "account_no": "1234",
  "account_type": "bank",
  "bic": "TESTDE88XXX",
  "blz": null,
  "connection_type": null,
  "created_at": "2023-04-04T10:14:14.000+02:00",
  "customer_id": null,
  "hbci": null,
  "hbci_host_url": null,
  "hbci_version": null,
  "primary": null,
  "title": "",
  "updated_at": "2023-04-04T10:14:14.000+02:00",
  "user_id": null,
  "iban": "DE62780708726552844215"
}
```

</details>

### Banking::BankTransaction (Banktransaktionen)

#### Alle Banktransaktionen

```js
client.v1.bankTransaction.all().then((bankTransactions, err) => {
  console.log(bankTransactions);
});
```

#### Parameter<!-- omit in toc -->

| Parameter        | Typ     | Beschreibung                  |
| ---------------- | ------- | ----------------------------- |
| page             | Integer | Seite                         |
| pageSize         | Integer | Anzahl der Elemente pro Seite |
| orderBy          | String  | Sortierung                    |
| orderDirection   | String  | Sortierungsrichtung           |
| bankConnectionId | Integer | ID der Bankverbindung         |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "list",
  "page": 1,
  "page_size": 100,
  "total_pages": 1,
  "total_entries": 2,
  "has_more": false,
  "entries": [
    {
      "type": "banking_transaction",
      "id": 577,
      "state": "imported",
      "value": 0,
      "currency": "EUR",
      "storno": null,
      "customerref": null,
      "instref": null,
      "gvcode": null,
      "text": null,
      "usage": null,
      "transaction_type": "default",
      "sepa": null,
      "from": {
        "bic": null,
        "iban": null,
        "account_no": null,
        "blz": null,
        "currency": null,
        "name": null
      },
      "saldo": {
        "value": 0,
        "currency": "EUR",
        "timestamp": "2023-04-04T10:14:14.000+02:00"
      },
      "primanota": null,
      "valuta": null,
      "bdate": "2023-04-04T10:14:14.000+02:00",
      "seen": null,
      "fintecapi_turnover_id": null,
      "imported_at": "2023-04-02T10:14:14.000+02:00",
      "created_at": "2023-04-04T10:14:14.000+02:00",
      "updated_at": "2023-04-04T10:14:14.000+02:00",
      "tags": null,
      "categories": null,
      "bank_connection": {
        "type": "bank_connection",
        "id": 1,
        "name": "Standard"
      }
    },
    {
      "type": "banking_transaction",
      "id": 578,
      "state": "imported",
      "value": 0,
      "currency": "EUR",
      "storno": null,
      "customerref": null,
      "instref": null,
      "gvcode": null,
      "text": null,
      "usage": null,
      "transaction_type": "default",
      "sepa": null,
      "from": {
        "bic": null,
        "iban": null,
        "account_no": null,
        "blz": null,
        "currency": null,
        "name": null
      },
      "saldo": {
        "value": 0,
        "currency": "EUR",
        "timestamp": "2023-04-04T10:14:14.000+02:00"
      },
      "primanota": null,
      "valuta": null,
      "bdate": "2023-04-04T10:14:14.000+02:00",
      "seen": null,
      "fintecapi_turnover_id": null,
      "imported_at": "2023-04-02T10:14:14.000+02:00",
      "created_at": "2023-04-04T10:14:14.000+02:00",
      "updated_at": "2023-04-04T10:14:14.000+02:00",
      "tags": null,
      "categories": null,
      "bank_connection": {
        "type": "bank_connection",
        "id": 1,
        "name": "Standard"
      }
    }
  ]
}
```

</details>

#### Eine bestimmte Banktransaktion

```js
client.v1.bankTransaction.by({ id: 464 }).then((bankTransaction, err) => {
  console.log(bankTransaction);
});
```

#### Parameter<!-- omit in toc -->

| Parameter | Typ     | Beschreibung |
| --------- | ------- | ------------ |
| id        | Integer | ID           |

 <details>

 <summary>Beispielantwort für `body`</summary>

```json
{
  "type": "banking_transaction",
  "id": 579,
  "state": "imported",
  "value": 0,
  "currency": "EUR",
  "storno": null,
  "customerref": null,
  "instref": null,
  "gvcode": null,
  "text": null,
  "usage": null,
  "transaction_type": "default",
  "sepa": null,
  "from": {
    "bic": null,
    "iban": null,
    "account_no": null,
    "blz": null,
    "currency": null,
    "name": null
  },
  "saldo": {
    "value": 0,
    "currency": "EUR",
    "timestamp": "2023-04-04T10:14:14.000+02:00"
  },
  "primanota": null,
  "valuta": null,
  "bdate": "2023-04-04T10:14:14.000+02:00",
  "seen": null,
  "fintecapi_turnover_id": null,
  "imported_at": "2023-04-02T10:14:14.000+02:00",
  "created_at": "2023-04-04T10:14:14.000+02:00",
  "updated_at": "2023-04-04T10:14:14.000+02:00",
  "tags": null,
  "categories": null,
  "bank_connection": {
    "type": "bank_connection",
    "id": 1,
    "name": "Standard"
  }
}
```

</details>

### Contact::Company (Unternehmen)

#### Alle Unternehmen

```js
client.v1.contactCompany.all().then((companies, err) => {
  console.log(companies);
});
```

#### Parameter<!-- omit in toc -->

| Parameter      | Typ     | Beschreibung                  |
| -------------- | ------- | ----------------------------- |
| page           | Integer | Seite                         |
| pageSize       | Integer | Anzahl der Elemente pro Seite |
| orderBy        | String  | Sortierung                    |
| orderDirection | String  | Sortierungsrichtung           |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "list",
  "page": 1,
  "page_size": 100,
  "total_pages": 1,
  "total_entries": 2,
  "has_more": false,
  "entries": [
    {
      "type": "company",
      "id": 4754,
      "name": "ACME Corp.",
      "contact_type": "customer",
      "supplier_no": null,
      "customer_no": "K-00001",
      "email": "contact@acme.com",
      "phone": "+1 555-0123",
      "website": "acme.com",
      "twitter": "therealacme",
      "fax": "+1 555-0124",
      "postal_street": "Musterstrasse 8",
      "postal_zip": "12345",
      "postal_city": "Musterstadt",
      "postal_country": "Deutschland",
      "physical_street": "Musterstrasse 8",
      "physical_zip": "12345",
      "physical_city": "Musterstadt",
      "physical_country": "Deutschland",
      "delivery_method": "pdf",
      "ust_idnr": "11/234/34567",
      "logo_file_name": null,
      "logo_content_type": null,
      "logo_file_size": null,
      "logo_updated_at": null,
      "bank_blz": "7212345",
      "bank_institute": "Gizmo Finances",
      "bank_account_no": "1234",
      "bank_bic": "GENOXXX",
      "bank_sepa_mandate_reference": "SEPAMRK00001AC",
      "bank_sepa_mandate_accepted": null,
      "bank_iban": "DE123456789",
      "inbound_address": "cxok",
      "notes": "A note about that company",
      "record_state": "active",
      "flagged": null,
      "created_at": "2023-04-04T10:14:14.000+02:00",
      "updated_at": "2023-04-04T10:14:14.000+02:00",
      "color": null
    },
    {
      "type": "company",
      "id": 4755,
      "name": "Mustermann Automobile GmbH",
      "contact_type": "supplier",
      "supplier_no": "L-00001",
      "customer_no": null,
      "email": null,
      "phone": null,
      "website": null,
      "twitter": null,
      "fax": null,
      "postal_street": "Dotzheimer Str. 36",
      "postal_zip": "65185",
      "postal_city": "Wiesbaden",
      "postal_country": "Deutschland",
      "physical_street": null,
      "physical_zip": null,
      "physical_city": null,
      "physical_country": "Deutschland",
      "delivery_method": null,
      "ust_idnr": "BE0999999999",
      "logo_file_name": null,
      "logo_content_type": null,
      "logo_file_size": null,
      "logo_updated_at": null,
      "bank_blz": "79351010",
      "bank_institute": "Sparkasse Bad Kissingen",
      "bank_account_no": "789456123",
      "bank_bic": "MARKDEFFXXX",
      "bank_sepa_mandate_reference": "SEPAMRL00001MAG",
      "bank_sepa_mandate_accepted": null,
      "bank_iban": "DE68210501700012345678",
      "inbound_address": "jgnf",
      "notes": null,
      "record_state": "active",
      "flagged": null,
      "created_at": "2023-04-04T10:14:14.000+02:00",
      "updated_at": "2023-04-04T10:14:14.000+02:00",
      "color": null
    }
  ]
}
```

</details>

#### Ein bestimmtes Unternehmen

```js
client.v1.contactCompany.by({ id: 4754 }).then((company, err) => {
  console.log(company);
});
```

#### Parameter<!-- omit in toc -->

| Parameter | Typ     | Beschreibung |
| --------- | ------- | ------------ |
| id        | Integer | ID           |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "company",
  "id": 4786,
  "name": "ACME Corp.",
  "contact_type": "customer",
  "supplier_no": null,
  "customer_no": "K-00001",
  "email": "contact@acme.com",
  "phone": "+1 555-0123",
  "website": "acme.com",
  "twitter": "therealacme",
  "fax": "+1 555-0124",
  "postal_street": "Musterstrasse 8",
  "postal_zip": "12345",
  "postal_city": "Musterstadt",
  "postal_country": "Deutschland",
  "physical_street": "Musterstrasse 8",
  "physical_zip": "12345",
  "physical_city": "Musterstadt",
  "physical_country": "Deutschland",
  "delivery_method": "pdf",
  "ust_idnr": "11/234/34567",
  "logo_file_name": null,
  "logo_content_type": null,
  "logo_file_size": null,
  "logo_updated_at": null,
  "bank_blz": "7212345",
  "bank_institute": "Gizmo Finances",
  "bank_account_no": "1234",
  "bank_bic": "GENOXXX",
  "bank_sepa_mandate_reference": "SEPAMRK00001AC",
  "bank_sepa_mandate_accepted": null,
  "bank_iban": "DE123456789",
  "inbound_address": "mg0h",
  "notes": "A note about that company",
  "record_state": "active",
  "flagged": null,
  "created_at": "2023-04-04T10:14:15.000+02:00",
  "updated_at": "2023-04-04T10:14:15.000+02:00",
  "color": null,
  "people": {
    "type": "list",
    "has_more": false,
    "url": "/api/v1/contact/companies/4786/persons",
    "entries": [
      {
        "type": "person",
        "id": 1459,
        "first_name": "John",
        "last_name": "Doe"
      },
      {
        "type": "person",
        "id": 1460,
        "first_name": "Kevin",
        "last_name": "Smart"
      }
    ]
  },
  "projects": {
    "type": "list",
    "has_more": false,
    "url": "/api/v1/projects?company_id=4786",
    "entries": [
      {
        "type": "project",
        "id": 6268,
        "name": "Kein Projekt"
      },
      {
        "type": "project",
        "id": 6269,
        "name": "My first project"
      }
    ]
  },
  "invoices": {
    "type": "list",
    "has_more": false,
    "url": "/api/v1/income/invoices?company_id=4786",
    "entries": []
  },
  "vouchers": {
    "type": "list",
    "has_more": false,
    "url": "/api/v1/expense/vouchers?company_id=4786",
    "entries": []
  }
}
```

</details>

### Contact::Company (Kontaktpersonen)

#### Alle Kontaktpersonen eines Unternehmens

```js
client.v1.contactCompanyPerson
  .all({ contactCompanyId: 123 })
  .then((persons, err) => {
    console.log(persons);
  });
```

#### Parameter<!-- omit in toc -->

| Parameter        | Typ     | Beschreibung                  |
| ---------------- | ------- | ----------------------------- |
| contactCompanyId | Integer | ID                            |
| page             | Integer | Seite                         |
| pageSize         | Integer | Anzahl der Elemente pro Seite |
| orderBy          | String  | Sortierung                    |
| orderDirection   | String  | Sortierungsrichtung           |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "list",
  "page": 1,
  "page_size": 100,
  "total_pages": 1,
  "total_entries": 2,
  "has_more": false,
  "entries": [
    {
      "type": "person",
      "id": 1494,
      "first_name": "John",
      "last_name": "Doe",
      "title": "Prof",
      "salutation": "Herr",
      "position": "Head of department",
      "department": "Purchasing",
      "phone": "+1 555-0123",
      "skype": null,
      "fax": "+1 555-0125",
      "email": "foo@bar.com",
      "flagged": null,
      "created_at": "2023-04-04T10:14:15.000+02:00",
      "updated_at": "2023-04-04T10:14:15.000+02:00",
      "mobile": "+1 555-0124",
      "comment": null,
      "default": null
    },
    {
      "type": "person",
      "id": 1495,
      "first_name": "Max",
      "last_name": "Mustermann",
      "title": "Herr",
      "salutation": null,
      "position": null,
      "department": null,
      "phone": "+49 111 11111",
      "skype": null,
      "fax": null,
      "email": null,
      "flagged": null,
      "created_at": "2023-04-04T10:14:15.000+02:00",
      "updated_at": "2023-04-04T10:14:15.000+02:00",
      "mobile": null,
      "comment": null,
      "default": null
    }
  ]
}
```

</details>

#### Eine Kontaktperson eines Unternehmens

```js
client.v1.contactCompanyPerson.by(contactCompanyId: 321, id: 123).then((person, err) => {
  console.log(person);
});
```

#### Parameter<!-- omit in toc -->

| Parameter        | Typ     | Beschreibung |
| ---------------- | ------- | ------------ |
| contactCompanyId | Integer | ID           |
| id               | Integer | ID           |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "person",
  "id": 1496,
  "first_name": "John",
  "last_name": "Doe",
  "title": "Prof",
  "salutation": "Herr",
  "position": "Head of department",
  "department": "Purchasing",
  "phone": "+1 555-0123",
  "skype": null,
  "fax": "+1 555-0125",
  "email": "foo@bar.com",
  "flagged": null,
  "created_at": "2023-04-04T10:14:15.000+02:00",
  "updated_at": "2023-04-04T10:14:15.000+02:00",
  "mobile": "+1 555-0124",
  "comment": null,
  "default": null,
  "company": {
    "type": "company",
    "id": 4794,
    "name": "ACME Corp.",
    "contact_type": "customer",
    "supplier_no": null,
    "customer_no": "K-00001",
    "email": null,
    "phone": null,
    "website": null,
    "twitter": null,
    "fax": null,
    "postal_street": "Dotzheimer Str. 36",
    "postal_zip": "65185",
    "postal_city": "Wiesbaden",
    "postal_country": "Deutschland",
    "physical_street": null,
    "physical_zip": null,
    "physical_city": null,
    "physical_country": "Deutschland",
    "delivery_method": null,
    "ust_idnr": "BE0999999999",
    "logo_file_name": null,
    "logo_content_type": null,
    "logo_file_size": null,
    "logo_updated_at": null,
    "bank_blz": "79351010",
    "bank_institute": "Sparkasse Bad Kissingen",
    "bank_account_no": "789456123",
    "bank_bic": "MARKDEFFXXX",
    "bank_sepa_mandate_reference": "SEPAMRK00001AC",
    "bank_sepa_mandate_accepted": null,
    "bank_iban": "DE68210501700012345678",
    "inbound_address": "op08",
    "notes": null,
    "record_state": "active",
    "flagged": null,
    "created_at": "2023-04-04T10:14:15.000+02:00",
    "updated_at": "2023-04-04T10:14:15.000+02:00",
    "color": null
  }
}
```

</details>

### Expense::Voucher (Ausgabebelege)

#### Alle Ausgabebelege<!-- omit in toc -->

```js
client.v1.expenseVoucher.all().then((vouchers, err) => {
  console.log(vouchers);
});
```

#### Parameter<!-- omit in toc -->

| Parameter              | Typ     | Beschreibung                     |
| ---------------------- | ------- | -------------------------------- |
| page                   | Integer | Seite                            |
| pageSize               | Integer | Anzahl der Elemente pro Seite    |
| orderBy                | String  | Sortierung                       |
| orderDirection         | String  | Sortierungsrichtung              |
| creditorId             | Integer | Gläubiger                        |
| projectId              | Integer | Projekt                          |
| documentDateRangeStart | Date    | Startdatum der Rechnungsstellung |
| documentDateRangeEnd   | Date    | Enddatum der Rechnungsstellung   |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "list",
  "page": 1,
  "page_size": 100,
  "total_pages": 1,
  "total_entries": 2,
  "has_more": false,
  "entries": [
    {
      "type": "expense_voucher",
      "id": 383,
      "name": "My voucher",
      "due_date": "2020-05-31",
      "document_date": "2020-05-01",
      "description": "Notes for the voucher",
      "entertainment_reason": null,
      "flagged": true,
      "provenance": "domestic",
      "voucher_no": "B-EXP-0001",
      "state": "unpaid",
      "record_state": "active",
      "amount": 0,
      "invoice_amount": 0,
      "entertainment_persons": []
    },
    {
      "type": "expense_voucher",
      "id": 384,
      "name": "FactoryBot Ausgabebeleg B-EXP-0001",
      "due_date": null,
      "document_date": "2023-04-04",
      "description": null,
      "entertainment_reason": null,
      "flagged": null,
      "provenance": "domestic",
      "voucher_no": "B-EXP-0001",
      "state": "unpaid",
      "record_state": "active",
      "amount": 0,
      "invoice_amount": 0,
      "entertainment_persons": []
    }
  ]
}
```

</details>

#### Ein bestimmter Ausgabebeleg

```js
client.v1.expenseVoucher.by({ id: 1 }).then((voucher, err) => {
  console.log(voucher);
});
```

#### Parameter<!-- omit in toc -->

| Parameter | Typ     | Beschreibung |
| --------- | ------- | ------------ |
| id        | Integer | ID           |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "expense_voucher",
  "id": 385,
  "name": "Restaurant visit",
  "due_date": "2020-06-30",
  "document_date": "2020-06-14",
  "description": "Took customer for dinner.",
  "entertainment_reason": "sales meeting",
  "flagged": true,
  "provenance": "domestic",
  "voucher_no": "B-EXP-0001",
  "state": "unpaid",
  "record_state": "active",
  "amount": 165.8,
  "invoice_amount": 0,
  "entertainment_persons": [],
  "creditor": {
    "type": "company",
    "id": 4814,
    "name": "Ristorante Il Porcino",
    "contact_type": "supplier",
    "supplier_no": "L-00001",
    "customer_no": null,
    "email": null,
    "phone": null,
    "website": null,
    "twitter": null,
    "fax": null,
    "postal_street": "Dotzheimer Str. 36",
    "postal_zip": "65185",
    "postal_city": "Wiesbaden",
    "postal_country": "Deutschland",
    "physical_street": null,
    "physical_zip": null,
    "physical_city": null,
    "physical_country": "Deutschland",
    "delivery_method": null,
    "ust_idnr": "BE0999999999",
    "logo_file_name": null,
    "logo_content_type": null,
    "logo_file_size": null,
    "logo_updated_at": null,
    "bank_blz": "79351010",
    "bank_institute": "Sparkasse Bad Kissingen",
    "bank_account_no": "789456123",
    "bank_bic": "MARKDEFFXXX",
    "bank_sepa_mandate_reference": "SEPAMRL00001RIP",
    "bank_sepa_mandate_accepted": null,
    "bank_iban": "DE68210501700012345678",
    "inbound_address": "emkx",
    "notes": null,
    "record_state": "active",
    "flagged": null,
    "created_at": "2023-04-04T10:14:16.000+02:00",
    "updated_at": "2023-04-04T10:14:16.000+02:00",
    "color": null
  },
  "line_items": [
    {
      "name": "restaurant bill",
      "amount": 150.8,
      "category": "Bewirtungskosten",
      "vat_rate": "19%",
      "billing": null,
      "depreciation": null
    },
    {
      "name": "tip",
      "amount": 15,
      "category": "Bewirtungskosten",
      "vat_rate": "19%",
      "billing": null,
      "depreciation": null
    }
  ],
  "documents": [
    {
      "type": "document",
      "id": 30,
      "uri": "http://test.odacer.com/system/attachments/1/documents/30/7e6274cdeac3ecfdd1e5c746f6378e5229ddfd0d/data/original/sample.pdf?1680596056"
    }
  ]
}
```

</details>

### Income::Estimate (Angebote)

#### Alle Angebote

```js
client.v1.incomeEstimate.all().then((estimates, err) => {
  console.log(estimates);
});
```

#### Parameter<!-- omit in toc -->

| Name                   | Typ     | Beschreibung                  |
| ---------------------- | ------- | ----------------------------- |
| page                   | Integer | Seite                         |
| pageSize               | Integer | Anzahl der Elemente pro Seite |
| orderBy                | String  | Sortierung                    |
| orderDirection         | String  | Sortierrichtung               |
| companyId              | Integer | ID der Firma                  |
| projectId              | Integer | ID des Projekts               |
| documentDateRangeStart | Date    | Startdatum                    |
| documentDateRangeEnd   | Date    | Enddatum                      |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "list",
  "page": 1,
  "page_size": 100,
  "total_pages": 1,
  "total_entries": 2,
  "has_more": false,
  "entries": [
    {
      "type": "estimate",
      "id": 483,
      "name": "My estimate",
      "description": "Notes for the estimate",
      "document_date": "2020-05-01",
      "customer_no": null,
      "estimate_no": "A-INC",
      "sent_on": "2023-04-04",
      "sent_via": null,
      "sent_to": null,
      "state": "accepted",
      "record_state": "active",
      "custom_template": null,
      "total_net": 200,
      "total_vat": 26,
      "total_gross": 226,
      "billing": {
        "company": "Mustermann Automobile GmbH",
        "email": null,
        "ust_idnr": "11/234/34567",
        "street": "Dotzheimer Str. 36",
        "zip": "65185",
        "city": "Wiesbaden",
        "country": "Deutschland",
        "contact_person": "John Doe",
        "department": "Purchasing"
      }
    },
    {
      "type": "estimate",
      "id": 484,
      "name": null,
      "description": null,
      "document_date": "2023-04-04",
      "customer_no": null,
      "estimate_no": "A-INC",
      "sent_on": "2023-04-04",
      "sent_via": null,
      "sent_to": null,
      "state": "accepted",
      "record_state": "active",
      "custom_template": null,
      "total_net": 0,
      "total_vat": 0,
      "total_gross": 0,
      "billing": {
        "company": "Mustermann Automobile GmbH",
        "email": null,
        "ust_idnr": null,
        "street": "Dotzheimer Str. 36",
        "zip": "65185",
        "city": "Wiesbaden",
        "country": "Deutschland",
        "contact_person": "Max Mustermann",
        "department": null
      }
    }
  ]
}
```

</details>

#### Ein bestimmtes Angebot

```js
client.v1.incomeEstimate.by({ id: 483 }).then((estimate, err) => {
  console.log(estimate);
});
```

#### Parameter<!-- omit in toc -->

| Name | Typ     | Beschreibung |
| ---- | ------- | ------------ |
| id   | Integer | ID           |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "estimate",
  "id": 485,
  "name": "My estimate",
  "description": "Notes for the estimate",
  "document_date": "2020-05-01",
  "customer_no": null,
  "estimate_no": "A-INC",
  "sent_on": "2023-04-04",
  "sent_via": null,
  "sent_to": null,
  "state": "draft",
  "record_state": "active",
  "custom_template": null,
  "total_net": 200,
  "total_vat": 26,
  "total_gross": 226,
  "billing": {
    "company": "Mustermann Automobile GmbH",
    "email": null,
    "ust_idnr": "11/234/34567",
    "street": "Dotzheimer Str. 36",
    "zip": "65185",
    "city": "Wiesbaden",
    "country": "Deutschland",
    "contact_person": "John Doe",
    "department": "Purchasing"
  },
  "customer": {
    "type": "company",
    "id": 4892,
    "name": "Mustermann Automobile GmbH",
    "contact_type": "customer"
  },
  "contact_person": {
    "type": "person",
    "id": 1533,
    "first_name": "John",
    "last_name": "Doe"
  },
  "project": {
    "type": "project",
    "id": 6365,
    "name": "My project"
  },
  "line_items": [
    {
      "line_item_type": "position",
      "position_in_group": null,
      "name": "Büroartikel",
      "description": null,
      "quantity": 1,
      "unit": "Stunde",
      "price": 100,
      "vat_rate": "19%",
      "total_net": 100,
      "proposition": {
        "type": "proposition",
        "id": 875,
        "name": "Service",
        "proposition_type": "service"
      }
    },
    {
      "line_item_type": "position",
      "position_in_group": null,
      "name": "Heizung",
      "description": null,
      "quantity": 1,
      "unit": "Stunde",
      "price": 100,
      "vat_rate": "7%",
      "total_net": 100,
      "proposition": {
        "type": "proposition",
        "id": 875,
        "name": "Service",
        "proposition_type": "service"
      }
    }
  ]
}
```

</details>

### Income::Invoice (Rechnungen)

#### Alle Rechnungen

```js
client.v1.incomeInvoice.all().then((invoices, err) => {
  console.log(invoices);
});
```

#### Parameter<!-- omit in toc -->

| Name                   | Typ     | Beschreibung                  |
| ---------------------- | ------- | ----------------------------- |
| page                   | Integer | Seite                         |
| pageSize               | Integer | Anzahl der Elemente pro Seite |
| orderBy                | String  | Sortierung                    |
| orderDirection         | String  | Sortierrichtung               |
| companyId              | Integer | ID der Firma                  |
| projectId              | Integer | ID des Projekts               |
| documentDateRangeStart | String  | Startdatum                    |
| documentDateRangeEnd   | String  | Enddatum                      |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "list",
  "page": 1,
  "page_size": 100,
  "total_pages": 1,
  "total_entries": 2,
  "has_more": false,
  "entries": [
    {
      "type": "invoice",
      "id": 539,
      "name": "My invoice",
      "description": "Notes for the invoice",
      "document_date": "2020-05-01",
      "due_date": "2020-05-31",
      "supply_date": "2023-04-04 10:14:22 +0200",
      "customer_no": null,
      "invoice_no": "R-INC",
      "sent_on": null,
      "sent_via": null,
      "sent_to": null,
      "paid_at_date": null,
      "state": "paid",
      "record_state": "active",
      "custom_template": null,
      "total_net": 200,
      "total_vat": 26,
      "total_gross": 226,
      "billing": {
        "company": "Mustermann Automobile GmbH",
        "email": null,
        "ust_idnr": "11/234/34567",
        "street": "Dotzheimer Str. 36",
        "zip": "65185",
        "city": "Wiesbaden",
        "country": "Deutschland",
        "contact_person": "John Doe",
        "department": "Purchasing"
      }
    },
    {
      "type": "invoice",
      "id": 540,
      "name": null,
      "description": null,
      "document_date": "2023-04-04",
      "due_date": "2023-04-04",
      "supply_date": "2023-04-04 10:14:22 +0200",
      "customer_no": null,
      "invoice_no": "R-INC",
      "sent_on": null,
      "sent_via": null,
      "sent_to": null,
      "paid_at_date": null,
      "state": "paid",
      "record_state": "active",
      "custom_template": null,
      "total_net": 0,
      "total_vat": 0,
      "total_gross": 0,
      "billing": {
        "company": "Mustermann Automobile GmbH",
        "email": null,
        "ust_idnr": null,
        "street": "Dotzheimer Str. 36",
        "zip": "65185",
        "city": "Wiesbaden",
        "country": "Deutschland",
        "contact_person": "Max Mustermann",
        "department": null
      }
    }
  ]
}
```

</details>

#### Eine bestimmte Rechnung

```js
client.v1.incomeInvoice
  .by({ id: 539 })
  .get()
  .then((invoice, err) => {
    console.log(invoice);
  });
```

#### Parameter<!-- omit in toc -->

| Name | Typ     | Beschreibung    |
| ---- | ------- | --------------- |
| id   | Integer | ID der Rechnung |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "invoice",
  "id": 541,
  "name": "My invoice",
  "description": "Notes for the invoice",
  "document_date": "2020-05-01",
  "due_date": "2020-05-31",
  "supply_date": "2023-04-04 10:14:22 +0200",
  "customer_no": null,
  "invoice_no": "R-INC",
  "sent_on": null,
  "sent_via": null,
  "sent_to": null,
  "paid_at_date": null,
  "state": "draft",
  "record_state": "active",
  "custom_template": null,
  "total_net": 200,
  "total_vat": 26,
  "total_gross": 226,
  "billing": {
    "company": "Mustermann Automobile GmbH",
    "email": null,
    "ust_idnr": "11/234/34567",
    "street": "Dotzheimer Str. 36",
    "zip": "65185",
    "city": "Wiesbaden",
    "country": "Deutschland",
    "contact_person": "John Doe",
    "department": "Purchasing"
  },
  "customer": {
    "type": "company",
    "id": 4972,
    "name": "Mustermann Automobile GmbH",
    "contact_type": "customer"
  },
  "contact_person": {
    "type": "person",
    "id": 1572,
    "first_name": "John",
    "last_name": "Doe"
  },
  "project": {
    "type": "project",
    "id": 6487,
    "name": "My project"
  },
  "line_items": [
    {
      "line_item_type": "position",
      "position_in_group": null,
      "name": "Büroartikel",
      "description": "Beschreibung einer Rechnungsposition",
      "quantity": 1,
      "unit": "Stunde",
      "price": 100,
      "vat_rate": "19%",
      "total_net": 100,
      "proposition": {
        "type": "proposition",
        "id": 883,
        "name": "Service",
        "proposition_type": "service"
      }
    },
    {
      "line_item_type": "position",
      "position_in_group": null,
      "name": "Heizung",
      "description": "Beschreibung einer Rechnungsposition",
      "quantity": 1,
      "unit": "Stunde",
      "price": 100,
      "vat_rate": "7%",
      "total_net": 100,
      "proposition": {
        "type": "proposition",
        "id": 883,
        "name": "Service",
        "proposition_type": "service"
      }
    }
  ]
}
```

</details>

### Income::Proposition (Waren / Dienstleistungen)

#### Alle Waren / Dienstleistungen

```js
client.v1.incomeProposition.all().then((propositions, err) => {
  console.log(propositions);
});
```

#### Parameter<!-- omit in toc -->

| Name           | Typ     | Beschreibung                  |
| -------------- | ------- | ----------------------------- |
| page           | Integer | Seite                         |
| pageSize       | Integer | Anzahl der Elemente pro Seite |
| orderBy        | String  | Sortierung                    |
| orderDirection | String  | Sortierrichtung               |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "list",
  "page": 1,
  "page_size": 100,
  "total_pages": 1,
  "total_entries": 2,
  "has_more": false,
  "entries": [
    {
      "type": "proposition",
      "id": 915,
      "name": "My proposition",
      "proposition_type": "product",
      "description": "Notes for the proposition",
      "price": "150.0",
      "time_unit": "hour",
      "unit_name_1": "Produkt",
      "unit_name_n": "Produkte",
      "record_state": "active",
      "flagged": null,
      "favorite": null,
      "created_at": "2023-04-04T10:14:24.000+02:00",
      "updated_at": "2023-04-04T10:14:24.000+02:00"
    },
    {
      "type": "proposition",
      "id": 916,
      "name": "Produkt",
      "proposition_type": "product",
      "description": "",
      "price": "150.0",
      "time_unit": "hour",
      "unit_name_1": "Produkt",
      "unit_name_n": "Produkte",
      "record_state": "active",
      "flagged": null,
      "favorite": null,
      "created_at": "2023-04-04T10:14:24.000+02:00",
      "updated_at": "2023-04-04T10:14:24.000+02:00"
    }
  ]
}
```

</details>

#### Eine bestimmte Ware / Dienstleistung

```js
client.v1.incomeProposition.by({ id: 915 }).then((proposition, err) => {
  console.log(proposition);
});
```

#### Parameter<!-- omit in toc -->

| Name | Typ     | Beschreibung                 |
| ---- | ------- | ---------------------------- |
| id   | Integer | ID der Ware / Dienstleistung |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "proposition",
  "id": 917,
  "name": "My proposition",
  "proposition_type": "product",
  "description": "Notes for the proposition",
  "price": "150.0",
  "time_unit": "hour",
  "unit_name_1": "Produkt",
  "unit_name_n": "Produkte",
  "record_state": "active",
  "flagged": null,
  "favorite": null,
  "created_at": "2023-04-04T10:14:24.000+02:00",
  "updated_at": "2023-04-04T10:14:24.000+02:00",
  "vat_rate": {
    "type": "vat_rate",
    "id": 1,
    "name": "19%",
    "rate": "0.19",
    "description": "Regulärer Umsatzsteuersatz für Verkäufe in Deutschland",
    "code": "AR19P",
    "country_code": "de",
    "vat_rate_type": "ar",
    "created_at": "2023-04-03T09:02:49.000+02:00",
    "updated_at": "2023-04-03T09:02:49.000+02:00"
  }
}
```

</details>

### Info

```js
client.v1.info.details().then((info, err) => {
  console.log(info);
});
```

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "api": {
    "version": "1.0.0"
  },
  "settings": {
    "custom_templates": {
      "invoices": [
        {
          "type": "template",
          "id": 25,
          "name": "Invoice type 1"
        },
        {
          "type": "template",
          "id": 26,
          "name": "Invoice type 2"
        }
      ]
    }
  }
}
```

</details>

### Project (Projekte)

#### Alle Projekte

```js
client.v1.project.all().then((projects, err) => {
  console.log(projects);
});
```

#### Parameter<!-- omit in toc -->

| Name           | Typ     | Beschreibung                  |
| -------------- | ------- | ----------------------------- |
| page           | Integer | Seite                         |
| pageSize       | Integer | Anzahl der Elemente pro Seite |
| orderBy        | String  | Sortierung                    |
| orderDirection | String  | Sortierrichtung               |
| companyId      | Integer | ID der Firma                  |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "list",
  "page": 1,
  "page_size": 100,
  "total_pages": 1,
  "total_entries": 2,
  "has_more": false,
  "entries": [
    {
      "type": "project",
      "id": 6561,
      "name": "My first project",
      "description": "This is my first project to make money.",
      "start_date": "2020-05-01",
      "end_date": "2020-05-31",
      "flagged": true,
      "budget_type": "money",
      "budget_money": "50000.0",
      "budget_time": null,
      "budget_time_unit": null,
      "customer_default": false,
      "record_state": "active",
      "created_at": "2023-04-04T10:14:24.000+02:00",
      "updated_at": "2023-04-04T10:14:24.000+02:00",
      "company_id": 5017,
      "color": "blue"
    },
    {
      "type": "project",
      "id": 6563,
      "name": "MyProjectName",
      "description": null,
      "start_date": "9999-01-01",
      "end_date": "9999-12-31",
      "flagged": null,
      "budget_type": null,
      "budget_money": null,
      "budget_time": null,
      "budget_time_unit": null,
      "customer_default": false,
      "record_state": "active",
      "created_at": "2023-04-04T10:14:24.000+02:00",
      "updated_at": "2023-04-04T10:14:24.000+02:00",
      "company_id": 5018,
      "color": null
    }
  ]
}
```

</details>

#### Ein bestimmtes Projekt

```js
client.v1.project.by({ id: 6561 }).then((project, err) => {
  console.log(project);
});
```

#### Parameter<!-- omit in toc -->

| Name | Typ     | Beschreibung    |
| ---- | ------- | --------------- |
| id   | Integer | ID des Projekts |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "project",
  "id": 6566,
  "name": "My first project",
  "description": "This is my first project to make money.",
  "start_date": "2020-05-01",
  "end_date": "2020-05-31",
  "flagged": true,
  "budget_type": "money",
  "budget_money": "50000.0",
  "budget_time": null,
  "budget_time_unit": null,
  "customer_default": false,
  "record_state": "active",
  "created_at": "2023-04-04T10:14:25.000+02:00",
  "updated_at": "2023-04-04T10:14:25.000+02:00",
  "company_id": 5019,
  "color": null,
  "default_proposition": {
    "type": "proposition",
    "id": 918,
    "name": "ACME Instant Tunnels",
    "proposition_type": "product",
    "description": "",
    "price": "150.0",
    "time_unit": "hour",
    "unit_name_1": "Produkt",
    "unit_name_n": "Produkte",
    "record_state": "active",
    "flagged": null,
    "favorite": null,
    "created_at": "2023-04-04T10:14:25.000+02:00",
    "updated_at": "2023-04-04T10:14:25.000+02:00"
  },
  "customer": {
    "type": "company",
    "id": 5019,
    "name": "ACME Corp.",
    "contact_type": "customer",
    "supplier_no": null,
    "customer_no": "K-00001",
    "email": null,
    "phone": null,
    "website": null,
    "twitter": null,
    "fax": null,
    "postal_street": "Dotzheimer Str. 36",
    "postal_zip": "65185",
    "postal_city": "Wiesbaden",
    "postal_country": "Deutschland",
    "physical_street": null,
    "physical_zip": null,
    "physical_city": null,
    "physical_country": "Deutschland",
    "delivery_method": null,
    "ust_idnr": "BE0999999999",
    "logo_file_name": null,
    "logo_content_type": null,
    "logo_file_size": null,
    "logo_updated_at": null,
    "bank_blz": "79351010",
    "bank_institute": "Sparkasse Bad Kissingen",
    "bank_account_no": "789456123",
    "bank_bic": "MARKDEFFXXX",
    "bank_sepa_mandate_reference": "SEPAMRK00001AC",
    "bank_sepa_mandate_accepted": null,
    "bank_iban": "DE68210501700012345678",
    "inbound_address": "fjal",
    "notes": null,
    "record_state": "active",
    "flagged": null,
    "created_at": "2023-04-04T10:14:24.000+02:00",
    "updated_at": "2023-04-04T10:14:24.000+02:00",
    "color": null
  },
  "team_members": [],
  "tasks": {
    "type": "list",
    "has_more": false,
    "url": "/api/v1/tracker/tasks?project_id=6566",
    "entries": [
      {
        "type": "task",
        "id": 1033,
        "name": "My first task",
        "project_id": 6566
      }
    ]
  },
  "invoices": {
    "type": "list",
    "has_more": false,
    "url": "/api/v1/income/invoices?project_id=6566",
    "entries": []
  },
  "vouchers": {
    "type": "list",
    "has_more": false,
    "url": "/api/v1/expense/vouchers?project_id=6566",
    "entries": []
  }
}
```

</details>

#### Neues Projekt erstellen

```js
const customerId = 3
client.v1.project.create(customerId, {
  name: "My first project",
  description: "This is my first project to make money.",
  startDate: "2020-05-01",
  endDate: "2020-05-31",
  flagged: false,
  budgetType: "money",
  budgetMoney: "50000.0",
  budgetTime: null,
  budgetTimeUnit: null,
  color: null,
  defaultPropositionId: 918,
  teamMembers: [{ id: 1}, { id: 2}],
}).then((project, err) => {
  console.log(project);
});
```

#### Update eines Projekts

```js
const projectId = 3
client.v1.project.update(projectId, {
  name: "My first project",
  description: "This is my first project to make money.",
  startDate: "2020-05-01",
  endDate: "2020-05-31",
  flagged: false,
  budgetType: "money",
  budgetMoney: "50000.0",
  budgetTime: null,
  budgetTimeUnit: null,
  color: null,
  defaultPropositionId: 918,
  teamMembers: [{ id: 1}, { id: 2}],
}).then((project, err) => {
  console.log(project);
});
```

#### Archivieren eines Projekts

```js
const projectId = 3
client.v1.project.archive(projectId).then((project, err) => {
  console.log(project);
});
```

#### Unarchivieren eines Projekts

```js
const projectId = 3
client.v1.project.unarchive(projectId).then((project, err) => {
  console.log(project);
});
```

#### Löschen eines Projekts

```js
const projectId = 3
client.v1.project.delete(projectId).then((project, err) => {
  console.log(project);
});
```

### Tracker::Task (Aufgaben)

#### Alle Aufgaben

```js
client.v1.trackerTask.all().then((tasks, err) => {
  console.log(tasks);
});
```

#### Parameter<!-- omit in toc -->

| Name           | Typ     | Beschreibung                  |
| -------------- | ------- | ----------------------------- |
| page           | Integer | Seite                         |
| pageSize       | Integer | Anzahl der Einträge pro Seite |
| orderBy        | String  | Sortierung                    |
| orderDirection | String  | Sortierrichtung               |
| projectId      | Integer | ID des Projekts               |
| propositionId  | Integer | ID der Angebot                |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "project",
  "id": 6566,
  "name": "My first project",
  "description": "This is my first project to make money.",
  "start_date": "2020-05-01",
  "end_date": "2020-05-31",
  "flagged": true,
  "budget_type": "money",
  "budget_money": "50000.0",
  "budget_time": null,
  "budget_time_unit": null,
  "customer_default": false,
  "record_state": "active",
  "created_at": "2023-04-04T10:14:25.000+02:00",
  "updated_at": "2023-04-04T10:14:25.000+02:00",
  "company_id": 5019,
  "color": null,
  "default_proposition": {
    "type": "proposition",
    "id": 918,
    "name": "ACME Instant Tunnels",
    "proposition_type": "product",
    "description": "",
    "price": "150.0",
    "time_unit": "hour",
    "unit_name_1": "Produkt",
    "unit_name_n": "Produkte",
    "record_state": "active",
    "flagged": null,
    "favorite": null,
    "created_at": "2023-04-04T10:14:25.000+02:00",
    "updated_at": "2023-04-04T10:14:25.000+02:00"
  },
  "customer": {
    "type": "company",
    "id": 5019,
    "name": "ACME Corp.",
    "contact_type": "customer",
    "supplier_no": null,
    "customer_no": "K-00001",
    "email": null,
    "phone": null,
    "website": null,
    "twitter": null,
    "fax": null,
    "postal_street": "Dotzheimer Str. 36",
    "postal_zip": "65185",
    "postal_city": "Wiesbaden",
    "postal_country": "Deutschland",
    "physical_street": null,
    "physical_zip": null,
    "physical_city": null,
    "physical_country": "Deutschland",
    "delivery_method": null,
    "ust_idnr": "BE0999999999",
    "logo_file_name": null,
    "logo_content_type": null,
    "logo_file_size": null,
    "logo_updated_at": null,
    "bank_blz": "79351010",
    "bank_institute": "Sparkasse Bad Kissingen",
    "bank_account_no": "789456123",
    "bank_bic": "MARKDEFFXXX",
    "bank_sepa_mandate_reference": "SEPAMRK00001AC",
    "bank_sepa_mandate_accepted": null,
    "bank_iban": "DE68210501700012345678",
    "inbound_address": "fjal",
    "notes": null,
    "record_state": "active",
    "flagged": null,
    "created_at": "2023-04-04T10:14:24.000+02:00",
    "updated_at": "2023-04-04T10:14:24.000+02:00",
    "color": null
  },
  "team_members": [],
  "tasks": {
    "type": "list",
    "has_more": false,
    "url": "/api/v1/tracker/tasks?project_id=6566",
    "entries": [
      {
        "type": "task",
        "id": 1033,
        "name": "My first task",
        "project_id": 6566
      }
    ]
  },
  "invoices": {
    "type": "list",
    "has_more": false,
    "url": "/api/v1/income/invoices?project_id=6566",
    "entries": []
  },
  "vouchers": {
    "type": "list",
    "has_more": false,
    "url": "/api/v1/expense/vouchers?project_id=6566",
    "entries": []
  }
}
```

</details>

#### Eine bestimmte Aufgabe

```js
client.v1.trackerTasks.by({ id: 11 }).then((tasks, err) => {
  console.log(tasks);
});
```

#### Parameter<!-- omit in toc -->

| Name | Typ     | Beschreibung   |
| ---- | ------- | -------------- |
| id   | Integer | ID der Aufgabe |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "task",
  "id": 1073,
  "name": "Some important task",
  "project_id": 6662,
  "relative_costs": null,
  "complete": null,
  "deadline": "2020-05-15",
  "flagged": null,
  "record_state": "active",
  "created_at": "2023-04-04T10:14:27.000+02:00",
  "updated_at": "2023-04-04T10:14:27.000+02:00",
  "project": {
    "type": "project",
    "id": 6662,
    "name": "Important project",
    "description": null,
    "start_date": "9999-01-01",
    "end_date": "9999-12-31",
    "flagged": null,
    "budget_type": null,
    "budget_money": null,
    "budget_time": null,
    "budget_time_unit": null,
    "customer_default": false,
    "record_state": "active",
    "created_at": "2023-04-04T10:14:27.000+02:00",
    "updated_at": "2023-04-04T10:14:27.000+02:00",
    "company_id": 5076,
    "color": null
  },
  "proposition": {
    "type": "proposition",
    "id": 930,
    "name": "Very important service",
    "proposition_type": "service",
    "description": "",
    "price": "150.0",
    "time_unit": "hour",
    "unit_name_1": "Stunde",
    "unit_name_n": "Stunden",
    "record_state": "active",
    "flagged": null,
    "favorite": null,
    "created_at": "2023-04-04T10:14:27.000+02:00",
    "updated_at": "2023-04-04T10:14:27.000+02:00"
  },
  "user": {
    "type": "user",
    "id": 1,
    "full_name": "Ansgar Agenturchef",
    "first_name": "Ansgar",
    "last_name": "Agenturchef",
    "role_f": "Accountinhaber",
    "email": "ansgar@odacer.com"
  }
}
```

</details>

### Tracker::TimeEntry (Zeiteinträge)

#### Alle Zeiteinträge

```js
client.v1.trackerTimeEntry.all().then((timeEntries, err) => {
  console.log(timeEntries);
});
```

#### Parameter<!-- omit in toc -->

| Name                | Typ     | Beschreibung                  |
| ------------------- | ------- | ----------------------------- |
| page                | Integer | Seite                         |
| pageSize            | Integer | Anzahl der Einträge pro Seite |
| orderBy             | String  | Sortierung                    |
| orderDirection      | String  | Sortierrichtung               |
| projectId           | Integer | Projekt-ID                    |
| taskId              | Integer | Aufgaben-ID                   |
| invoiceId           | Integer | Rechnungs-ID                  |
| userId              | Integer | Benutzer-ID                   |
| billingState        | String  | Rechnungsstatus               |
| startTimeRangeStart | String  | Startzeitpunkt                |
| startTimeRangeEnd   | String  | Endzeitpunkt                  |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "list",
  "page": 1,
  "page_size": 100,
  "total_pages": 1,
  "total_entries": 2,
  "has_more": false,
  "entries": [
    {
      "type": "time_entry",
      "id": 582,
      "user_id": 1392,
      "task_id": 1115,
      "project_id": 6759,
      "started_at": "2020-05-11T10:00:00.000+02:00",
      "ended_at": "2020-05-11T12:00:00.000+02:00",
      "duration": 7200,
      "comments": "",
      "fingerprint": "20230404081429521",
      "record_state": "active",
      "billable_duration": 7200,
      "unbillable": false,
      "created_at": "2023-04-04T10:14:29.000+02:00",
      "updated_at": "2023-04-04T10:14:29.000+02:00"
    },
    {
      "type": "time_entry",
      "id": 583,
      "user_id": 1,
      "task_id": 1116,
      "project_id": 6762,
      "started_at": "2023-04-04T10:14:00.000+02:00",
      "ended_at": "2023-04-04T13:14:00.000+02:00",
      "duration": 10800,
      "comments": "",
      "fingerprint": "20230404081429446",
      "record_state": "active",
      "billable_duration": 10800,
      "unbillable": false,
      "created_at": "2023-04-04T10:14:29.000+02:00",
      "updated_at": "2023-04-04T10:14:29.000+02:00"
    }
  ]
}
```

</details>

#### Einen Zeiteintrag

```js
client.v1.trackerTimeEntry.by({ id: 666 }).then((timeEntry, err) => {
  console.log(timeEntry);
});
```

#### Parameter<!-- omit in toc -->

| Name | Typ     | Beschreibung |
| ---- | ------- | ------------ |
| id   | Integer | ID           |

<details>

<summary>Beispielantwort für `body`</summary>

```json
{
  "type": "time_entry",
  "id": 584,
  "user_id": 1395,
  "task_id": 1117,
  "project_id": 6764,
  "started_at": "2020-05-11T10:00:00.000+02:00",
  "ended_at": "2020-05-11T12:00:00.000+02:00",
  "duration": 7200,
  "comments": "",
  "fingerprint": "2023040408142919",
  "record_state": "active",
  "billable_duration": 7200,
  "unbillable": false,
  "created_at": "2023-04-04T10:14:29.000+02:00",
  "updated_at": "2023-04-04T10:14:29.000+02:00",
  "project": {
    "type": "project",
    "id": 6764,
    "name": "Some important project",
    "description": null,
    "start_date": "9999-01-01",
    "end_date": "9999-12-31",
    "flagged": null,
    "budget_type": null,
    "budget_money": null,
    "budget_time": null,
    "budget_time_unit": null,
    "customer_default": false,
    "record_state": "active",
    "created_at": "2023-04-04T10:14:29.000+02:00",
    "updated_at": "2023-04-04T10:14:29.000+02:00",
    "company_id": 5133,
    "color": null
  },
  "task": {
    "type": "task",
    "id": 1117,
    "name": "Some Task",
    "project_id": 6764,
    "relative_costs": null,
    "complete": null,
    "deadline": null,
    "flagged": null,
    "record_state": "active",
    "created_at": "2023-04-04T10:14:29.000+02:00",
    "updated_at": "2023-04-04T10:14:29.000+02:00"
  },
  "user": {
    "type": "user",
    "id": 1395,
    "full_name": "Will E Coyote",
    "first_name": "Will E",
    "last_name": "Coyote",
    "role_f": "Zeiterfasser",
    "email": "user-5370f244dfed5468f4e8@example.org"
  },
  "invoice": null
}
```

</details>

## Configuration

Es könnnen Environment-Variables gesetzt werden, um die Konfiguration des Clients zu übernehmen.

Schau dazu mal in die [.env.example](.env.example) Datei.

## Tests

1. stell sicher, dass die Environment-Variable `PAPIERKRAM_API_SUBDOMAIN` gesetzt ist
2. stell sicher, dass die Environment-Variable `PAPIERKRAM_API_KEY` gesetzt ist
3. `$ npm test`

### VSCode

I recommend using [Jest Run It](https://marketplace.visualstudio.com/items?itemName=vespa-dev-works.jestRunIt) to run/debug tests right from your editor.

Here's what my settings look like:

Example `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "jestRunIt.environmentVariables": "NODE_OPTIONS=--experimental-vm-modules",
  "jestRunIt.jestCLIOptions": ["--detectOpenHandles"]
}
```
