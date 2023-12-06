// So much mocking. This is purely a "make it work" solution for now.
// TODO: Make the whole testing paradigm better. Including implementing some actual tests.


import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from 'util';

// @ts-ignore
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;

window.env = {
    SIMPLIFIED_ONBOARDING_API_URL: "dummy",
    WHITELIST: "dummy"
}

jest.mock('react', () => {
    const actual = jest.requireActual('react')
    return {
      ...actual,
      useContext: () => ({ }),
      useRef: () => ({ current: null, isPositioned: false }),
      forwardRef: () => ({ current: null, isPositioned: false }),
      useState: jest.fn().mockReturnValue([{}, jest.fn()])
    }
})

jest.mock('react-router-dom', () => {
    const actual = jest.requireActual('react')
    return {
        ...actual,
        Routes: jest.fn().mockReturnValue('<div />'),
        Route: jest.fn().mockReturnValue('<div />'),
        useLocation: jest.fn().mockReturnValue({
            pathname: "dummy"
        })
    }
});

jest.mock("@tanstack/react-query", () => ({
    useQuery: jest.fn().mockReturnValue(({ data: {}, isLoading: false, error:{} })),
    useMutation: jest.fn().mockReturnValue(({ data: {}, isLoading: false, error:{} })),
    useQueryClient: jest.fn().mockReturnValue(({ data: {}, isLoading: false, error:{} }))
}));

jest.mock('./hooks/auth', () => ({
    useUser: jest.fn().mockReturnValue(({ data: { isAuthenticated: true, user: { name: "dummy", reporteeName: "dummy" } }, isLoading: false, error:{} })),
    useConfig: jest.fn().mockReturnValue(({ data: {}, isLoading: false, error:{} }))
}));

jest.doMock('./components/common/StyledLink/StyledLink', () => {
    const StyledLink = () => '<div />';
    return StyledLink;
});

jest.doMock('./components/common/Header/Header', () => {
    const Header = () => '<div>Mocked Header</div>';
    return Header;
});

jest.mock('@digdir/design-system-react', () => ({
    Label: jest.fn().mockReturnValue('<div />'),
    Button: jest.fn().mockReturnValue('<div />'),
    Logo: jest.fn().mockReturnValue('<div />'),
    DropdownMenu: jest.fn().mockImplementation(() => {
        return {
            __esModule: true,
            Item: jest.fn().mockReturnValue('<div />'),
            render: jest.fn().mockReturnValue('<div />')
        }
    })
}));

jest.mock('@navikt/aksel-icons', () => {
    const actual = jest.requireActual('@navikt/aksel-icons')
    return {
        ...actual,
        EnvelopeClosedIcon: jest.fn().mockReturnValue('<div />'),
        FigureIcon: jest.fn().mockReturnValue('<div />'),
        PhoneIcon: jest.fn().mockReturnValue('<div />'),
        ChevronRightIcon: jest.fn().mockReturnValue('<div />'),
        LeaveIcon: jest.fn().mockReturnValue('<div />'),
        MenuHamburgerIcon: jest.fn().mockReturnValue('<div />'),
        XMarkIcon: jest.fn().mockReturnValue('<div />'),
        BagdeIcon: jest.fn().mockReturnValue('<div />'),
        KeyHorizontalIcon: jest.fn().mockReturnValue('<div />'),
        TrashIcon: jest.fn().mockReturnValue('<div />'),
        XMarkOctagonFillIcon: jest.fn().mockReturnValue('<div />'),
        ExclamationmarkTriangleFillIcon: jest.fn().mockReturnValue('<div />'),
        KeyHorizontalFillIcon: jest.fn().mockReturnValue('<div />'),
        PlusCircleIcon: jest.fn().mockReturnValue('<div />'),
        PlusIcon: jest.fn().mockReturnValue('<div />'),
        Buldings2Icon: jest.fn().mockReturnValue('<div />'),
        InformationSquareIcon: jest.fn().mockReturnValue('<div />'),
        TerminalIcon: jest.fn().mockReturnValue('<div />'),
        BranchingIcon: jest.fn().mockReturnValue('<div />'),
        ClipboardIcon: jest.fn().mockReturnValue('<div />'),
        TasklistIcon: jest.fn().mockReturnValue('<div />')
    }
});
