const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
    console.log('🔍 Testando conexão com o banco...');
    console.log('🔍 Variáveis de ambiente:', {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        hasPassword: !!process.env.DB_PASSWORD
    });

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            connectTimeout: 30000,
        });

        console.log('✅ Conexão estabelecida com sucesso!');

        // Testar query simples
        const [rows] = await connection.execute('SELECT 1 as test');
        console.log('✅ Query de teste executada:', rows);

        // Ver tabelas disponíveis
        const [tables] = await connection.execute('SHOW TABLES');
        console.log('✅ Tabelas disponíveis:', tables);

        // Ver estrutura da tabela categoria
        const [categoriaStructure] = await connection.execute('DESCRIBE categoria');
        console.log('✅ Estrutura da tabela categoria:', categoriaStructure);

        // Ver estrutura da tabela produto
        const [produtoStructure] = await connection.execute('DESCRIBE produto');
        console.log('✅ Estrutura da tabela produto:', produtoStructure);

        // Testar query na tabela categoria
        const [categoriaCount] = await connection.execute('SELECT COUNT(*) as total FROM categoria');
        console.log('✅ Total de categorias:', categoriaCount);

        // Testar query na tabela produto
        const [produtoCount] = await connection.execute('SELECT COUNT(*) as total FROM produto');
        console.log('✅ Total de produtos:', produtoCount);

        await connection.end();
        console.log('✅ Conexão fechada');

    } catch (error) {
        console.error('❌ Erro na conexão:', error);
        console.error('❌ Código do erro:', error.code);
        console.error('❌ Número do erro:', error.errno);
    }
}

testConnection();
