import { Request, Response } from "express";
import { getAddressInfo } from "../services/getAddressInfo";
import transporter from "../services/mailTransporter";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password, zipcode } = req.body;
        const address = await getAddressInfo(zipcode)
        if (!address) {
            throw new Error("Error on getAddress")
        }
        //res.send({address})

        const info = await transporter.sendMail({
            from: `<${process.env.NODEMAILER_USER}>`,
            to: `${email}`,
            subject: `Cadastro realizado`,
            text: `Olá, parabéns por inscrever. 
            Segue os dados:
            PASSWORD: ${password}
            ENDEREÇO: ${address.city}/${address.state} 
            ${address.district}, ${address.street}`,
            html: `<p><strong>Olá, parabéns por inscrever. </strong>
            Segue os dados:
            PASSWORD: <em>${password}</em>
            ENDEREÇO: ${address.city}/${address.state} 
            ${address.district}, ${address.street}</p>`
        })

        res.send({ info, message: "Cadastro concluído com sucesso" })

    } catch (error) {
        if (error instanceof Error) {
            res.send({ error, message: error.message })
        } else {
            res.send({ message: "Erro inesperado" })
        }
    }
}