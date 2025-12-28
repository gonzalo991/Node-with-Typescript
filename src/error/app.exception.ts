abstract class AppException extends Error {
    public readonly name: string;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationException extends AppException {
    constructor(message: string) {
        super(`Validation process failed: ${message}`);
    }
}

export class UpdateException extends AppException {
    constructor(message: string) {
        super(`It's not possible to update the object: ${message}`);
    }
}

export class NotFoundException extends AppException {
    constructor(id: string) {
        super(`Object with id: ${id} not found.`);
    }
}

