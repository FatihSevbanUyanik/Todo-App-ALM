import request from 'supertest'
import User from '../src/model/user' 
import Todo from '../src/model/todo' 
import { app } from '../src/app'
const password = 'naruto1212'

test('POST:/api/todo', async () => {

   const user = User.build({ 
      email: 'userTemp@gmail.com', 
      passwordConfirm: password, 
      username: 'userTemp', 
      password 
   }) 

   await user.save()
   const token = `Bearer ${ User.generateJWT({ id: user._id }) }` 

   // request data
   const data = [
      { body: {}, expectedStatus: 400 }, // empty body
      { body: { content: `` }, expectedStatus: 400 }, // empty content
      { body: { content: `lorem ipsum content` }, expectedStatus: 200 }, // success
   ]

   // sending requests
   for (const requestItem of data) {
      await request(app)
         .post('/api/v1/todo')
         .set('Authorization', token)
         .set('Accept', 'application/json')
         .send(requestItem.body)
         .expect('Content-Type', /json/)
         .expect(requestItem.expectedStatus)     
   }
});


test('PATCH:/api/todo', async () => {
   const user = User.build({ 
      email: 'userTemp@gmail.com', 
      passwordConfirm: password, 
      username: 'userTemp', 
      password 
   }) 

   await user.save()
   const token = `Bearer ${ User.generateJWT({ id: user._id }) }` 

   // registering todo
   const todo = Todo.build({ content: "my content", userId: user._id })
   await todo.save()

   // request data
   const data = [
      { body: { isDone: true }, expectedStatus: 400 }, // todo missing
      { body: { todoId: todo._id }, expectedStatus: 400 }, // isDone missing
      { body: { todoId: 'random', isDone: true }, expectedStatus: 400 }, // wrong todo 
      { body: { todoId: todo._id, isDone: true }, expectedStatus: 200 }, // success
      { body: { todoId: todo._id, isDone: false }, expectedStatus: 200 }, // success
   ]

   // sending requests
   for (const requestItem of data) {
      await request(app)
         .patch('/api/v1/todo')
         .set('Authorization', token)
         .set('Accept', 'application/json')
         .send(requestItem.body)
         .expect('Content-Type', /json/)
         .expect(requestItem.expectedStatus)     
   }
});


test('DELETE:/api/todo', async () => {
   const user = User.build({ 
      email: 'userTemp@gmail.com', 
      passwordConfirm: password, 
      username: 'userTemp', 
      password 
   }) 

   await user.save()
   const token = `Bearer ${ User.generateJWT({ id: user._id }) }` 

   // registering todo
   const todo = Todo.build({ content: "my content", userId: user._id })
   await todo.save()

   // request data
   const data = [
      { body: {}, expectedStatus: 400 }, // todo missing 
      { body: { todoId: 'random' }, expectedStatus: 400 }, // wrong todo 
      { body: { todoId: todo._id }, expectedStatus: 200 }, // success
   ]
   
   // sending requests
   for (const requestItem of data) {
      await request(app)
         .delete('/api/v1/todo')
         .set('Authorization', token)
         .set('Accept', 'application/json')
         .send(requestItem.body)
         .expect('Content-Type', /json/)
         .expect(requestItem.expectedStatus)
   }

   await todo.remove()
});


test('GET:/api/todo', async () => {
   const user = User.build({ 
      email: 'userTemp@gmail.com', 
      passwordConfirm: password, 
      username: 'userTemp', 
      password 
   }) 

   await user.save()
   const token = `Bearer ${ User.generateJWT({ id: user._id }) }` 

   // registering todo
   const todo = Todo.build({ content: "my content", userId: user._id })
   await todo.save()

   // sending request
   await request(app)
      .get('/api/v1/todo')
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
});