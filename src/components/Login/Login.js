import './Login.css'
import Form from '../Form/Form'

const Login = ({serverError}) => {
    return (
        <main className="login">
            <Form
                name="login"
                title="Рады видеть!"
                buttonText="Войти"
                inputs={[
                    {
                        key: 0,
                        type: 'email',
                        name: 'email',
                        required: 'required',
                        minLength: '5',
                        maxLength: '30',
                        title: 'E-mail',
                        value: 'pochta@yandex.ru',
                    },
                    {
                        key: 1,
                        type: 'password',
                        name: 'password',
                        required: 'required',
                        minLength: '8',
                        maxLength: '20',
                        title: 'Пароль'
                    },
                ]}
                text="Ещё не зарегистрированы?"
                navText="Регистрация"
                navLink="/signup"
                serverError={serverError}
            >

            </Form>
        </main>

    );
}

export default Login;