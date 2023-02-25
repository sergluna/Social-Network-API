const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: string,
            required: true,
            unique: true,
            enum: {
                values: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
                message: '{VALUE} is not a valid email'
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thougths'
            }
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;