import path from "path";
import * as grpc from "@grpc/grpc-js";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import * as ProtoLoader from "@grpc/proto-loader";

const packageDefinition = ProtoLoader.loadSync(
  path.join(__dirname, "../src/a.proto"),
);

const personProto = grpc.loadPackageDefinition(packageDefinition);

const PERSONS = [
  {
    name: "Ace",
    age: 24,
  },
  {
    name: "Luffy",
    age: 18,
  },
];

//call -> req
//callback -> res
//To make this easier to understand
//@ts-ignore
function addPersonFunc(call, callback) {
  console.log(call);
  let person = {
    name: call.request.name,
    age: call.request.age,
  };
  PERSONS.push(person);
  callback(null, person);
}

const server = new grpc.Server();

server.addService(
  (personProto.AddressBookService as ServiceClientConstructor).service,
  { addPerson: addPersonFunc },
);
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
  },
);
