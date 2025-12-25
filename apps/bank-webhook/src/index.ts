import express from 'express';
import db from "repo/db/client";

const app = express();

app.post("/hdfcWebHook",async (req,res) =>{
    const paymentInformation = {
        token : req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    db.balance.update({
        where: {
            userId: paymentInformation.userId
        },
        data: {
            amount: {
                increament: paymentInformation.amount
            }
        }
    })

    await db.onRampTransaction.update({
        where: {
            token: paymentInformation.token,
        },
        data: {
            status: "Success"
        }
    })
    res.status(411).json({
        message : "Error"
    })
})