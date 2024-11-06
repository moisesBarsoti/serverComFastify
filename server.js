import { fastify } from 'fastify';
import { databaseMemory } from './databaseMemory.js';
import { request } from 'http';

// Criação do servidor
const server = fastify();

// Criação do database
const database = new databaseMemory()

// Rotas
server.post('/videos', (request, reply) => {
    const { title, description, duration } = request.body

    database.create({
        title,
        description,
        duration
    });

    return reply.status(201).send()
});

server.get('/videos', (request) => {
    const search = request.query.search
    console.log(search)

    const videos = database.list(search)

    return videos
});

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
});

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.body

    database.delete(videoId)

    return reply.status(204).send()
});

// Porta
server.listen({
    port: 3333,
})