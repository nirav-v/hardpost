import { render, screen } from '@testing-library/react';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import ButtonModal from './ButtonModal';

describe('button modal tests', () => {
  it('renders button modal correctly', () => {
    const buttonText = 'open test modal';

    render(
      <ButtonModal
        buttonContent={buttonText}
        chakraColor="blue"
        cypress="cypress-test-attr">
        Test Button Modal
      </ButtonModal>
    );

    expect(screen.getByText(buttonText)).toBeVisible();
  });
});
