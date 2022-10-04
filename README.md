# PortPortal (or whatever we call it)

PortPortal simply takes any message sent to its port, and sets the react props on everything inside the data of the message. It's a simple way to pass data from one component to another.


It also makes the context available via a hook

One thing to note is that undefined values are not set, so that state that is not defined by the message will not be set to 'undefined'.

You can see it in action by running the tests, Or via `yarn start`
