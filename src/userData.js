import  { faker } from '@faker-js/faker';

export class UserData{
    constructor(){
        this.data = {};
    }
    addName(){
        this.data.userName = faker.internet.username();
        return this;
    }
    addEmail(){
        this.data.email =  faker.internet.email({provider: 'example.com'});
        return this;
    }
    addPassword(){
        this.data.password = "Pss!!!";
        return this;
    }
    generate(){
        this.addName();
        this.addEmail();
        this.addPassword();
        return {...this.data}
    }
};
//проверка

const user = new UserData().generate();
console.log(user)
