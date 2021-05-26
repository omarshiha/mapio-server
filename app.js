const GeolcationSimulation = require('./geolocation-simulator');
const server = require('http').createServer();
const options = {cors:true, origins:["http://localhost:3000"]};
const io = require('socket.io')(server, options);
let interval;

io.on("connection", (socket) => {
    console.log("New client connected");

    var coordinates = [
        {latitude: 42.352376, longitude: -71.064548},
        {latitude: 42.353454, longitude: -71.064184},
        {latitude: 42.354707, longitude: -71.063647},
        {latitude: 42.355785, longitude: -71.062768},
        {latitude: 42.356483, longitude: -71.062016},
        {latitude: 42.357069, longitude: -71.062660},
        {latitude: 42.357672, longitude: -71.063261},
        {latitude: 42.357164, longitude: -71.064978},
        {latitude: 42.356768, longitude: -71.066844},
        {latitude: 42.356213, longitude: -71.069334},
        {latitude: 42.355832, longitude: -71.070921},
        {latitude: 42.355452, longitude: -71.072509},
        {latitude: 42.353517, longitude: -71.071479},
        {latitude: 42.351947, longitude: -71.070685},
        {latitude: 42.352566, longitude: -71.067595},
        {latitude: 42.352344, longitude: -71.064591}
    ];
    var simulation = GeolcationSimulation.GeoSim({coords: coordinates, speed: 90});
    simulation.start();

    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => getApiAndEmit(socket), 300);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    let lastLocation = GeolcationSimulation.getLastCoords();
    console.log(lastLocation)
    const response = new Date();
    socket.emit("FromAPI", lastLocation);
};

const port = process.env.PORT || 4001;
server.listen(port, () => console.log(`Listening on port ${port}`));