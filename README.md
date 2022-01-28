# Directus SES 💬
An extension for sending emails with AWS SES. 
> Disclaimer: this is currently not intended for a production environment.

## Installation
- Download or fork the repository
- Install the requirements\
  `npm install`
- Build the extension\
  `npm run build`
- Create a folder in your directus endpoints folder named `SES` or an alternate route name.
- Move the `index.js` build file to your new folder  `directus/extensions/SES/index.js`
- Include the required AWS keys in your Directus .env file.
- Start your Directus instance `npx directus start`



## API Reference
This extension was made for sending notifications with Directus & AWS SES. Since it is limited in scope, certain SES api features are not currently supported. 

|  Type| Supported |
|--|--|
| POST/send | ✅ Supported [Reference]|
| Messages API | 👷🏻‍♂️ In Progress |

## Authentication
Requests made by unauthenticated users will be rejected. Requests must be made with a cookie or bearer token.


## Sending Notifications
An example `POST` request made to `https://directusAppDomain/SES{or custom path}/`
In this example we are sending a test message to two recipients.
```JSON
{
  "from": "hello@ryntab.com",
  "to": "***********@gmail.com, ************@gmail.com",
  "subject": "Message",
  "text": "Hello Github",
    "ses": {
      "Tags": [
        {
          "Name": "tag_name",
          "Value": "tag_value"
        }
      ]
    }
  }

```

## Handlebars Templating
In order to use Handlebars email templating with Directus, you must first install the Express Handlebars plugin for Nodemailer in the root directory of your Directus application. 

`npm install nodemailer-express-handlebars`

After installing the package, create a folder called `views` in your Directus extensions folder. The `extensions/views` folder will house your Handlebars templates.

To use a created template, pass the template name in your POST request along with some context. 
In this example, a template called `alert.handlebars` will be selected from the `views` folder and the context will be passed to the template.

If you're unfamiliar with Handlebars, context can be referenced in a template with this syntax `{{{title}}` [@data variables](https://handlebarsjs.com/api-reference/data-variables.html#root)
```
{JSON
  "from": "hello@ryntab.com",
  "to": "*********@gmail.com",
  "subject": "This email was made with Handlebars",
	"template" : "alert",
	"context" : {
		"title": "Im a title!",
		"subtitle": "Im a subtitle!",
		"body": "Im the body!"
	}
}
```

## Environment Variables
```
EMAIL_FROM="hello@ryntab.com"
EMAIL_TRANSPORT="SES"
EMAIL_SES_CREDENTIALS__ACCESS_KEY_ID="************************"
EMAIL_SES_CREDENTIALS__SECRET_ACCESS_KEY="****************************************"
EMAIL_SES_REGION="us-east-1"
EMAIL_SES_API_VERSION="2010-12-01"
EMAIL_SES_ALLOW_GUEST_SEND=false
```

> Guest sending is intended for more convenient debugging with API clients, you should always set this to false when not debugging. 🚨
