import axios from "axios";

export default () => {
    return {
        servico:
            axios.create({
                baseURL: "https://bolsa-de-valores-livia-delgado.herokuapp.com/",
                withCredentials: false
            })
    };
};