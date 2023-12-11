import { UserAuthForm } from "@/components/AuthForm/AuthForm.tsx";
import React from "react";
import styles from "./LoginPage.module.css";
import loginImage from '@/assets/images/login-page-backgrounf-image.png'

interface AuthenticationPageProps {}

const AuthenticationPage: React.FC<AuthenticationPageProps> = () => {
    return (
        <div className={styles['container']}>
            <div className={styles['image-container']}>
                <div className={styles['image-overlay']}></div>
                <img src={loginImage} alt='Изображение для страницы входа' />
            </div>
            <div className={styles['login-form-container']}>
                <div className={styles['form-container']}>
                    <div className="flex flex-col space-y-2 text-center">
                        <h1
                            className={`${styles.title} text-4xl font-extrabold tracking-tight lg:text-5xl`}
                        >
                            Вход в Smart Campus
                        </h1>
                        <p
                            className={`${styles.subtitle} text-sm text-muted-foreground`}
                        >
                            Приложение для бронирования аудиторий IT-центра МАИ и кафедры 806
                        </p>
                    </div>
                    <UserAuthForm />
                </div>
            </div>
        </div>
    );
};

export default AuthenticationPage;