"""Module for custom exceptions."""


class ModeusError(Exception):
    """Modeus global exception."""


class LoginFailedError(ModeusError):
    """Login failed, check username and password."""


class CannotAuthenticateError(ModeusError):
    """Internal error."""

    def __init__(self) -> None:
        super().__init__("Something went wrong. Maybe auth flow has changed?")
