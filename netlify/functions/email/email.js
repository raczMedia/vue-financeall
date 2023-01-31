// const client = require('@sendgrid/mail');
// const {
//     SENDGRID_API_KEY,
//     SENDGRID_TO_EMAIL,
//     SENDGRID_FROM_EMAIL,
// } = process.env;

// const handler = async function (event) {
//     const headers = {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "Content-Type",
//         'Access-Control-Allow-Credentials': true
//     }

//     const { message, email, firstName, lastName } = JSON.parse(event.body);
//     client.setApiKey(SENDGRID_API_KEY);

//     const data = {
//         to: SENDGRID_TO_EMAIL,
//         from: SENDGRID_FROM_EMAIL,
//         subject: `Portfolio Site message from ${firstName} ${lastName} (${email})`,
//         html: message,
//     };

//     try {
//         await client.send(data);
//         return {
//             statusCode: 200,
//             headers,
//             body: 'Message sent',
//         };
//     } catch (error) {
//         return {
//             statusCode: error.code,
//             headers,
//             body: JSON.stringify({ ...error }),
//         };
//     }
// };

// module.exports = { handler }
