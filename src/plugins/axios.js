import axios from "axios";

export default () => {
    return {
        servico:
            axios.create({
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // baseURL: "https://bolsa-de-valores-livia-delgado.herokuapp.com/",
                baseURL: "http://127.0.0.1:8000/"
            }),
    };
};