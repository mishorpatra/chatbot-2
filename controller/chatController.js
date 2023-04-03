const { Client, LocalAuth  ,Buttons, List, MessageMedia} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal')


let client

const sendMessages = async (req, res) => {
    try {
        if(client) {
            const { phoneNumber, countryCode, message } = req.body
            if (!phoneNumber || !countryCode || !message) {
                return res.status(201).json({
                status: "error",
                message: `Invalid input to sendMessage, INPUT: ${req.body}`,
                });
            }
            const {
                id: { fromMe },
            } = await client.sendMessage(`${countryCode}${phoneNumber}@c.us`, message);
            if (fromMe) {
                return res.status(200).json({
                status: "success",
                message: `Message successfully sent to ${phoneNumber}`,
                });
            }
        }
    } catch (error) {
        console.log(`Error while sending the messages ${error}`)
    }
}

const initiateClient = async (req, res) => {
    try {
        console.log("initiating client")
        client = new Client({
            authStrategy: new LocalAuth()
        })
        
        
        
        client.on('qr', async qr => {
            qrcode.generate(qr, {small: true})
            return await res.status(200).json({ type: "qr", code: qr })
        })
        
        
        
        client.on('ready', async () => {
            console.log("client is ready")
            return await res.status(200).json({ status: "bot is ready" })
        })

        client.initialize()

        client.on('message', async (msg) => {
        if(msg.body === 'hello' || msg.body === 'Hello') {
            client.sendMessage(msg.from, "Namaste! 🙏\n\nWelcome to ICICI Bank WhatsApp Banking.\n\nYou hereby agree to the Terms & Conditions of WhatsApp banking 👉 bit.ly/BankingTandC\n\n💡 Tip: Type menu to see all the Menu options, anytime.");
            let button = new Buttons('Would you like to receive updates & important information from ICICI Bank over WhatsApp? 💬', [{body:'Later'},{body:'Yes'}], '', '');
            client.sendMessage(msg.from, button)
        }
    else if(msg.body === 'Later') {
            client.sendMessage(msg.from, "sure, we will show you later")
        }
    else if(msg.body === 'Yes') {
            let  button = new Buttons('Here are our Recommended Services 👇', [{body: 'My Account Balance'}, {body: 'Credit Card limit'}, {body: 'Fast Tag Balance'}], '', '')
            client.sendMessage(msg.from, button)
            let list = new List(
            "Tap below 👇 to explore All Services",
            "All Services",
            [
                {
                title: "All Services",
                rows: [
                {id: "loanServices", title: "Loan Services"},
                {id: "FDServices", title: "FD Services"},
                {id: "otherServices", title: "Other Services"}
                ],
                },
            ],
            "Tap to select a service"
            )
            client.sendMessage(msg.from, list)
            }
            //  else {
            //	client.sendMessage(msg.from, "Sorry I didn't understand what you just said 😔")
            //	client.sendMessage(msg.from, "If you're stuck,\nType menu see all the Menu options\nType restart to start all over again")
            //	}
            });
        client.on('message', async (msg) => {
        if(msg.type === 'list_response') {
            msg.reply(`You've selected ${msg.body}`);
        }
        })


    } catch(error) {
        console.log(`Error while initiating the client ${error}`)
    }
}

module.exports = {sendMessages, initiateClient}
