import withCors from 'nextjs-cors';

export default withCors({
  origin: '*', // дозволяє доступ з будь-якого джерела
  methods: ['GET', 'POST'], // дозволяє запити GET та POST
});
