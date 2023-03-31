const db = require('../../Model');
const BankDetail = db.bankDetails;

exports.addBankDetails = async (req, res) => {
    try {
        const { accountNumber, IFSCCode, bankName, nameInAccount } = req.body;
        await BankDetail.create({
            accountNumber: accountNumber,
            IFSCCode: IFSCCode,
            bankName: bankName,
            nameInAccount: nameInAccount,
            userId: req.user.id
        });
        res.status(200).send({ message: "User's bank details added successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.findBankDetails = async (req, res) => {
    try {
        const bankdetails = await BankDetail.findOne({ where: { userId: req.user.id } });
        res.status(200).send(bankdetails);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.findAllBankDetails = async (req, res) => {
    try {
        const bankdetails = await BankDetail.findAll();
        res.status(200).send(bankdetails);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}