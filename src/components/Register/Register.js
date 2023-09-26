import './Register.css'
import Form from '../Form/Form'

const Register = ({ serverError, onRegister }) => {

    return (
        <main className="register">
            <Form
                name="register"
                title="Добро пожаловать!"
                buttonText="Зарегистрироваться"
                inputs={[
                    {
                        key: 1,
                        type: 'text',
                        name: 'name',
                        required: 'required',
                        minLength: '2',
                        maxLength: '30',
                        title: 'Имя',
                        placeholder: 'Имя',
                        error: ''
                    },
                    {
                        key: 2,
                        type: 'email',
                        name: 'email',
                        required: 'required',
                        minLength: '5',
                        maxLength: '30',
                        title: 'E-mail',
                        placeholder: 'E-mail',
                        error: ''
                    },
                    {
                        key: 3,
                        type: 'password',
                        name: 'password',
                        required: 'required',
                        minLength: '8',
                        maxLength: '20',
                        title: 'Пароль',
                        placeholder: 'Пароль',
                        error: 'Что-то пошло не так...'
                    },
                ]}
                text="Уже зарегистрированы?"
                navText="Войти"
                navLink="/signin"
                serverError={serverError}
                onSubmit={onRegister}
            >

            </Form>
        </main>

    );
}

export default Register;