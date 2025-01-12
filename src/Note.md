## NestJS Best Practices
- **Use DTOs and Validation Pipes in Controllers**: Validate incoming data structure and types using DTOs and validation pipes.
- **Perform Business Logic Validations in Services**: Handle more complex validations that require business logic or database checks in the service layer.
- **Throw Exceptions in Services**: Use exceptions to communicate validation failures back to the controller.
- **Keep Controllers Focused**: Aim to keep your controllers focused on handling requests and responses, while delegating business logic and validations to the service layer.