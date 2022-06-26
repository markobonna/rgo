const BuyInsurance = () => {
return (


        const address = "0x44a01e6e4cf96a76AE19881862a65a7DAb679D0B";
        const resp = await fetch(
    `https://api-eu1.tatum.io/v3/polygon/account/balance/${address}`,
    {
        method: "GET",
        headers: {
        "x-api-key": "64bd25f6-8acd-4dbc-8661-fa87a59678fc",
        },
    }
    );
    );
};

export default Balance;
