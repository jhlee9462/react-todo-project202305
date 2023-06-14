import React from 'react';
import {Grid, Button, Container, Typography, TextField} from "@mui/material";
import {Link, useNavigate} from 'react-router-dom';

import {API_BASE_URL as BASE, USER} from '../../config/host-config';
import {isLogin, setLoginUserInfo} from "../../util/login-util";

const Login = () => {

    const redirection = useNavigate();

    if (isLogin()) {
        alert('이미 로그인 중입니다.');
        window.history.back();
        return;
    }

    const REQUEST_URL = BASE + USER + '/signin';

    // 서버에 AJAX요청
    const fetchLogin = async () => {

        // 이메일, 비밀번호 입력 태그 얻어오기
        const $email = document.getElementById('email');
        const $password = document.getElementById('password');

        const res = await fetch(REQUEST_URL, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: $email.value,
                password: $password.value
            })
        });

        if (res.status === 400) { // 가입이 안되어있거나, 비번틀린 경우
            const text = await res.text(); // 서버에서 온 문자열 읽기
            alert(text);
            return;
        }

        const userInfo = await res.json(); // 서버에서 온 json 읽기
        // alert(json.userName);

        setLoginUserInfo(userInfo);

        // 홈으로 리다이렉트
        redirection('/');

    };


    // 로그인 요청 핸들러
    const loginHandler = e => {
        e.preventDefault();

        // 서버에 로그인 요청 전송
        fetchLogin();

    };


    return (
        <Container component="main" maxWidth="xs" style={{margin: "200px auto"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                </Grid>
            </Grid>

            <form noValidate onSubmit={loginHandler}>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="email address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="on your password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{background: '#38d9a9'}}
                        >
                            로그인
                        </Button>
                    </Grid>
                    <Grid item>
                        <Link to="/join">
                            회원가입을 통해 서비스를 이용하세요.
                        </Link>
                    </Grid>
                    <Grid container justify="flex-end">
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default Login;