const paypal = require('paypal-rest-sdk')

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AUI5JTjJE6uAERX7id7ICQ3yFwMFRU6ssXijPWp3TR5PeVnGNW6xzlKIgfLgCCAMCDivO5HKcobPwE2a',
    'client_secret': 'ECYBRWZjmnPu00Xy9lZbsCy3jHJKANKwNRL_8VQTHJmaKAvDs_6Ti0ERmfnWsofuVnH2w2pDmAiN4jh6'
})

exports.payment = (req, res) => {
    const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: "http://localhost:4848/success",
          cancel_url: "http://localhost:4848/fail",
        },
        transactions: [
          {
            item_list: {
              items: [
                {
                  name: "Nodejs Book",
                  sku: "001",
                  price: "50.00",
                  currency: "USD",
                  quantity: 1,
                },
              ],
            },
            amount: {
              currency: "USD",
              total: "50.00",
            },
            description: "A book on Nodejs",
          },
        ],
      };
    
      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          throw error;
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === "approval_url") {
              res.redirect(payment.links[i].href);
            }
          }
        }
      });
}

exports.success = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "50.00",
          },
        },
      ],
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (
      error,
      payment
    ) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        // console.log(JSON.stringify(payment));
        //   res.send("Success");
          res.sendFile(__dirname + '/success.html');
      }
    });
}

exports.fail = (req, res) => {
    console.log('fail')
    res.sendFile(__dirname + '/err.html');
}