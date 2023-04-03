const express = require('express')
const bodyParser = require('body-parser')
const qrcode = require('qrcode-terminal')
const routes = require("./routes.js")


const app = express()

app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.listen(8000, () => {
    console.log(`Server is running on PORT 8000`)
})
app.use('/', routes)




// client.on('message', async (msg) => {
//     if(msg.body === 'hello' || msg.body === 'Hello') {
//          client.sendMessage(msg.from, "Namaste! 🙏\n\nWelcome to ICICI Bank WhatsApp Banking.\n\nYou hereby agree to the Terms & Conditions of WhatsApp banking 👉 bit.ly/BankingTandC\n\n💡 Tip: Type menu to see all the Menu options, anytime.");
//          let button = new Buttons('Would you like to receive updates & important information from ICICI Bank over WhatsApp? 💬', [{body:'Later'},{body:'Yes'}], '', '');
//          client.sendMessage(msg.from, button)
//     }
//    else if(msg.body === 'Later') {
//          client.sendMessage(msg.from, "sure, we will show you later")
//     }
//    else if(msg.body === 'Yes') {
//         let  button = new Buttons('Here are our Recommended Services 👇', [{body: 'My Account Balance'}, {body: 'Credit Card limit'}, {body: 'Fast Tag Balance'}], '', '')
//          client.sendMessage(msg.from, button)
//         let list = new List(
//         "Tap below 👇 to explore All Services",
//         "All Services",
//         [
//             {
//             title: "All Services",
//             rows: [
//             {id: "loanServices", title: "Loan Services"},
//             {id: "FDServices", title: "FD Services"},
//             {id: "otherServices", title: "Other Services"}
//             ],
//             },
//         ],
//         "Tap to select a service"
//         )
//          client.sendMessage(msg.from, list)
//         }
//         //  else {
//         //	client.sendMessage(msg.from, "Sorry I didn't understand what you just said 😔")
//         //	client.sendMessage(msg.from, "If you're stuck,\nType menu see all the Menu options\nType restart to start all over again")
//         //	}
//         });
//     client.on('message', async (msg) => {
//     if(msg.type === 'list_response') {
//          msg.reply(`You've selected ${msg.body}`);
//     }
//     })


