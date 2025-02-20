import hashlib
from typing import Any, Callable, Dict, Optional, Tuple

from starlette.requests import Request
from starlette.responses import Response


def key_builder(
    func: Callable[..., Any],
    namespace: str = "",
    *,
    request: Optional[Request] = None,
    response: Optional[Response] = None,
    args: Tuple[Any, ...],
    kwargs: Dict[str, Any],
) -> str:
    cache_key = hashlib.md5(
        f"{func.__module__}:{func.__name__}:{args}".encode(),
    ).hexdigest()
    return f"{namespace}:{cache_key}"

