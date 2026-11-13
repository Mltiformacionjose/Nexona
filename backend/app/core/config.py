"""Configuración de la aplicación leída desde variables de entorno."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Variables de entorno documentadas en NEX-DOC-006 v0.2."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    database_url: str
    frontend_origin: str = "http://localhost:3000"


settings = Settings()
