# Nombres de submódulos que forman el módulo `reportes`.
__all__ = ["schemas", "repository", "service", "router"]


def get_router():

    try:
        from .router import router  # type: ignore
        return router
    except Exception:
        return None
