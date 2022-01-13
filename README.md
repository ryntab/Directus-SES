



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

## Environment Variables
`EMAIL_FROM="hello@ryntab.com"`
`EMAIL_TRANSPORT="SES"`
`EMAIL_SES_CREDENTIALS__ACCESS_KEY_ID="************************"`
`EMAIL_SES_CREDENTIALS__SECRET_ACCESS_KEY="****************************************"`
`EMAIL_SES_REGION="us-east-1"`
`EMAIL_SES_API_VERSION="2010-12-01"`
