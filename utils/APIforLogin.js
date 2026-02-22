class APIforLogin{
    constructor(apiContext,payloadLogin){
        this.apiContext = apiContext;
        this.payloadLogin = payloadLogin;
    }

    async getToken(){
        const responseLogin = await this.apiContext.post('https://demo.koperasijsit.id/login',
            {
                data:this.payloadLogin
            }
        );
        console.log("Status:", responseLogin.status());

        const text = await responseLogin.text();
        console.log("Response body:", text);

        return;
        // const text = await responseLogin.text();
        // console.log(text);
        // const responseJSON = await responseLogin.json();
        // const token = responseJSON.token();
        // return token;

    }
}

module.exports = {APIforLogin};