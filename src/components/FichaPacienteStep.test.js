import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FichaPacienteStep } from './FichaPacienteStep';

describe('FichaPacienteStep', () => {
  beforeAll(() => {
    global.MutationObserver = class {
      observe() {}
      disconnect() {}
      takeRecords() { return []; }
    };
  });

  test('consulta la cédula al completar 9 dígitos y llena el nombre', async () => {
    const update = jest.fn();
    const form = {
      patient: {
        name: '',
        recordNumber: '',
        idNumber: '',
        birthDate: '',
        age: '',
        sex: '',
        phone: '',
        address: '',
        occupation: '',
        religion: '',
        facility: '',
        service: '',
        room: '',
        bed: '',
        NombrePadreMadre: '',
        reliability: 'Confiable',
      },
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        nombre: 'JOSE ALBERTO DE JESUS MURILLO JIMENEZ',
      }),
    });

    render(<FichaPacienteStep form={form} update={update} />);

    fireEvent.change(screen.getByLabelText(/No\. de cédula/i), {
      target: { value: '105740025' },
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.hacienda.go.cr/fe/ae?identificacion=105740025',
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      );
    });

    expect(update).toHaveBeenCalledWith('patient', 'idNumber', '105740025');
  });
});
