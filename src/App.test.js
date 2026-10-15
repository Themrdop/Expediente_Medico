import { validateRequiredPatientFields } from './App';

describe('validateRequiredPatientFields', () => {
  test('detecta campos requeridos vacíos', () => {
    expect(
      validateRequiredPatientFields({
        patient: {
          name: '',
          idNumber: '',
          sex: '',
        },
      }),
    ).toEqual(['Nombre y apellido', 'No. de cédula', 'Sexo']);
  });

  test('acepta cuando todos los campos requeridos están completos', () => {
    expect(
      validateRequiredPatientFields({
        patient: {
          name: 'Ana María',
          idNumber: '123456789',
          sex: 'Femenino',
        },
      }),
    ).toEqual([]);
  });
});
