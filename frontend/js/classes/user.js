export class User {
    // constructor(email, password, password2, fullName, lastName, conditions, privacy) {
        constructor() {
        this.email;
        this.fullName;
        this.lastName;
        this.password;
        this.password2;
        this.conditions;
        this.privacy;
        this.errors = [];
        // this.email      = email;
        // this.fullName   = fullName;
        // this.lastName   = lastName;
        // this.password   = password;
        // this.password2  = password2;
        // this.conditions = conditions;
        // this.privacy    = privacy;
        // this.errors     = [];
    }

    validatePasswords(password, password2) {
        if(password.length < 6) {
            this.errors.push('la contraseña debe de ser mayor a 6 caracteres');
        }

        if(password != password2) {
            this.errors.push('las contraseñas no son iguales');
        }
    }

    validateEmail(email) {
        // console.log(`${email} ${email.length}`);
        // console.log(`${this.email} ${this.email.length}`);        
        if(email.length == 0 || email == '') {
            this.errors.push('El email es obligatorio');
            return
        }

        if (!/^(?!.*[Ã±Ã‘])(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {  
           this.errors.push('por favor escribe un email válido'); 
        }
        
    }

    validateData(fullName, lastName) {
        if(fullName.length == 0 || fullName == '') {
            this.errors.push('el nombre es importante');
        };
        if(lastName.length == 0 || lastName == '') {
            this.errors.push('el apellido es importante');
        }
    }

    validateChecks(conditions, privacy) {
        if(!conditions) {
            this.errors.push('seleccionar condiciones');
        }
        if(!privacy) {
            this.errors.push('seleccionar privacidad')
        }
    }

    init(email, password, password2, fullName, lastName, conditions, privacy) {
        this.errors = [];
        this.validateData(fullName, lastName);
        this.validateEmail(email);
        this.validatePasswords(password, password2);
        this.validateChecks(conditions, privacy);
        // return this.errors.lenght > 0 ? this.errors : true
        if(this.errors.length > 0) {
            return this.errors;
        } else if(this.errors.length == 0) {
            return true;
        }
    }


}