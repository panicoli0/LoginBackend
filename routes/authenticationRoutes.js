const mongoose = require('mongoose');
const Account = mongoose.model('accounts');

module.exports = app => {
    //Routes
    app.get('/account', async (req, res)=>{
    
        const {rUsername, rPassword} = req.query;
        if(rUsername == null || rPassword == null)
        {
            res.send("Invalid Credentials");
            return;
        }

        var userAccount = await Account.findOne({ username : rUsername});
        if(userAccount == null){
            //create a new account
            console.log("Create a new account... ");

            var newAccount = new Account({
                username : rUsername,
                password : rPassword,

                lastAuthentication : Date.now()
            });
            await newAccount.save();

            res.send(newAccount);
            return;
        } else {
            if(rPassword == userAccount.password){
                userAccount.lastAuthentication = Date.now();
                await userAccount.save();

                console.log("Retriving account");
                res.send(userAccount);
                return;
            }
        }
        res.send("Invalid Credentials");
        return;
        });
}
