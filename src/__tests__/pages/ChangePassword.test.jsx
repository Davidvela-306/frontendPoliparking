import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/helpers/test-utils";
import ChangePassword from "@/pages/ChangePassword";
import userEvent from "@testing-library/user-event";
import userService from "@/services/userService";
// import adminService from "@/services/adminService";
// import guardiaService from "@/services/guardiaService";

// Mock de los servicios
vi.mock('@/services/adminService', () => ({
  default: {
    confirmChangePassword: vi.fn(() => Promise.resolve()),
    recoverPassword: vi.fn(() => Promise.resolve())
  }
}));

vi.mock('@/services/guardiaService', () => ({
  default: {
    confirmChangePassword: vi.fn(() => Promise.resolve()),
    recoverPassword: vi.fn(() => Promise.resolve())
  }
}));

vi.mock('@/services/userService', () => ({
  default: {
    confirmChangePassword: vi.fn(() => Promise.resolve()),
    recoverPassword: vi.fn(() => Promise.resolve())
  }
}));

// Mock de window.location
delete window.location;
window.location = {
  href: '',
};

// Mock de URLSearchParams
const mockURLSearchParams = vi.fn();
vi.stubGlobal('URLSearchParams', mockURLSearchParams);
mockURLSearchParams.mockImplementation(() => ({
  get: () => 'test-token'
}));

describe('ChangePassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.href = '';
  });

  it('renderiza correctamente el componente', () => {
    renderWithProviders(<ChangePassword />);
    
    expect(screen.getByText('Cambiar Contraseña')).toBeInTheDocument();
    expect(screen.getByText('Ingresa una nueva contraseña y confirma el cambio.')).toBeInTheDocument();
    expect(screen.getByText('Rol')).toBeInTheDocument();
    expect(screen.getByText('Nueva Contraseña')).toBeInTheDocument();
    expect(screen.getByText('Confirmar Contraseña')).toBeInTheDocument();
  });

  it('muestra errores de validación cuando se envía el formulario vacío', async () => {
    renderWithProviders(<ChangePassword />);
    
    const submitButton = screen.getByText('Cambiar contraseña');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Rol es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument();
      expect(screen.getByText('La confirmación de la contraseña es obligatoria')).toBeInTheDocument();
    });
  });

  it('valida que las contraseñas coincidan', async () => {
    renderWithProviders(<ChangePassword />);
    
    const passwordInput = screen.getByPlaceholderText('Escribe tu nueva contraseña');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirma tu nueva contraseña');
    
    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(confirmPasswordInput, 'password124');
    
    const submitButton = screen.getByText('Cambiar contraseña');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
    });
  });

  it('valida la longitud mínima de la contraseña', async () => {
    renderWithProviders(<ChangePassword />);
    
    const passwordInput = screen.getByPlaceholderText('Escribe tu nueva contraseña');
    await userEvent.type(passwordInput, '123');
    
    const submitButton = screen.getByText('Cambiar contraseña');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('La contraseña debe tener al menos 8 caracteres.')).toBeInTheDocument();
    });
  });

  it('maneja correctamente el cambio de contraseña para un usuario', async () => {
    vi.mocked(userService.confirmChangePassword).mockResolvedValueOnce(undefined);
    vi.mocked(userService.recoverPassword).mockResolvedValueOnce(undefined);
    
    const alertMock = vi.fn();
    window.alert = alertMock;
    
    renderWithProviders(<ChangePassword />);
    
    // Seleccionar rol
    const rolSelect = screen.getByRole('combobox');
    await userEvent.selectOptions(rolSelect, 'Usuario');
    
    // Ingresar contraseñas
    const passwordInput = screen.getByPlaceholderText('Escribe tu nueva contraseña');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirma tu nueva contraseña');
    
    await userEvent.type(passwordInput, 'newpassword123');
    await userEvent.type(confirmPasswordInput, 'newpassword123');
    
    const submitButton = screen.getByText('Cambiar contraseña');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(userService.confirmChangePassword).toHaveBeenCalledWith('test-token');
      expect(userService.recoverPassword).toHaveBeenCalled();
      expect(alertMock).toHaveBeenCalledWith('Contraseña cambiada exitosamente. Inicia sesión con tu nueva contraseña.');
      expect(window.location.href).toBe('/singin');
    });
  });

  it('maneja correctamente los errores del servicio', async () => {
    const errorMock = new Error('Error de servicio');
    vi.mocked(userService.confirmChangePassword).mockRejectedValueOnce(errorMock);
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    renderWithProviders(<ChangePassword />);
    
    // Seleccionar rol
    const rolSelect = screen.getByRole('combobox');
    await userEvent.selectOptions(rolSelect, 'Usuario');
    
    // Ingresar contraseñas
    const passwordInput = screen.getByPlaceholderText('Escribe tu nueva contraseña');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirma tu nueva contraseña');
    
    await userEvent.type(passwordInput, 'newpassword123');
    await userEvent.type(confirmPasswordInput, 'newpassword123');
    
    const submitButton = screen.getByText('Cambiar contraseña');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error al cambiar la contraseña:',
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});