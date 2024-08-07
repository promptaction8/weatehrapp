import type { Connection } from 'mysql2/promise'

// 회원 조회

export const getUserEmail = async (email: string, connection: Connection) => {
    const [rows, fields] = await connection.query(
        `SELECT * FROM user WHERE email="${email}"`
    )
    return rows
}
export const getUserName = async (name: string, connection: Connection) => {
    const [rows, fields] = await connection.query(
        `SELECT * FROM user WHERE name="${name}"`
    )
    return rows
}

interface ICreateUser {
    name: string
    email: string
    password: string
    connection: Connection
}
// 회원 가입

export const signUp = async ({
    name,
    email,
    password,
    connection,
}: ICreateUser) => {
    const [rows, fields] = await connection.query(
        `INSERT INTO user (name, email, password) VALUES ("${name}", "${email}", "${password}")`
    )
    return rows
}

// 회원가입 시 중복된 아이디 체크
export const isDuplicatedUserEmailOrName = async (
    name: string,
    email: string,
    connection: Connection
) => {
    const [rows, field] = await connection.query(
        `SELECT * FROM user WHERE email="${email}" or name="${name}"`
    )
    if (rows.length >= 1) {
        return true
    }
    return false
}

export const passwordChange = async (
    email: string,
    password: string,
    connection: Connection
) => {
    const [rows, field] = await connection.query(
        `UPDATE user SET password = "${password}" WHERE email="${email}"`
    )
    return rows
}

export const passwordReset = async (
    email: string,
    emailCode: string,
    connection: Connection
) => {
    const [rows, field] = await connection.query(
        `INSERT INTO certification (email, emailCode) VALUES ('${email}', '${emailCode}')`
    )
    return rows
}

export const passwordCompareWithTempPassword = async (
    tempPassword: string,
    connection: Connection
) => {
    const [rows, field] = await connection.query(
        `SELECT * FROM user WHERE password = "${tempPassword}"`
    )
    return rows
}

export const updateTheNewPassword = async (
    email: string,
    hashedNewPassword: string,
    connection: Connection
) => {
    const [rows, field] = await connection.query(
        `UPDATE user SET password = "${hashedNewPassword}" WHERE email="${email}"`
    )
    return rows
}

export const updateTempPassword = async (
    generateTempPassword: string,
    email: string,
    connection: Connection
) => {
    const [rows, field] = await connection.query(
        `UPDATE user SET password = "${generateTempPassword}" WHERE email = "${email}"`
    )
    return rows
}

export const findEmailFromCode = async (
    code: string,
    connection: Connection
) => {
    const [rows, field] = await connection.query(
        `SELECT * FROM certification WHERE emailcode = "${code}"`
    )
    return rows
}

export const updateNewPassword = async (
    hashedCheckPassword: string,
    email: string,
    connection: Connection
) => {
    const [rows, fields] = await connection.query(
        `UPDATE user SET password = "${hashedCheckPassword}" WHERE email = "${email}"`
    )
}

export const updateNewPasswordByToken = async (
    hashedCheckPassword: string,
    email: string,
    connection: Connection
) => {
    const [rows, fields] = await connection.query(
        `UPDATE user SET password = "${hashedCheckPassword}" WHERE email = "${email}"`
    )
}
