import './Login.css'
import Form from '../Form/Form'

const Login = ({serverError, onLogin}) => {
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
                onSubmit={onLogin}
            >

            </Form>
        </main>

    );
}


export default Login;