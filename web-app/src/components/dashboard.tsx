import React, { ReactElement, useRef } from 'react';
import style from '@/styles/dashboard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToolBar from '@/components/dashboard_toolbar';

export interface IDashboardRefreshable {
  refresh: () => void;
}

interface DashboardDisplaySelectionProps {
  name: string;
  displayComponent: ReactElement;
}

interface DashboardProps {
  selectionDropdownName: string;
  defaultDisplayComponent?: number;
  dashboardDisplaySelectionProps: DashboardDisplaySelectionProps[];
}

const Dashboard: React.FC<DashboardProps> = ({
  selectionDropdownName,
  dashboardDisplaySelectionProps,
  defaultDisplayComponent = 0,
}: DashboardProps) => {
  const [activeDashboardDisplay, setActiveDashboardDisplay] = React.useState<number>(defaultDisplayComponent);
  const activeDashboardDisplayRef = useRef<IDashboardRefreshable>(null);
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);

  return (
    <div className={style.container}>
      <ToolBar
        isRefreshing={isRefreshing}
        onReload={() => {
          if (activeDashboardDisplayRef.current) {
            setIsRefreshing(true);
            activeDashboardDisplayRef.current.refresh();
            setTimeout(() => {
              setIsRefreshing(false);
            }, 500);
          }
        }}
        dashboardSelectionDropdownProps={{
          name: selectionDropdownName,
          defaultItem: defaultDisplayComponent,
          itemsProps: dashboardDisplaySelectionProps.map((selectionProp, index) => {
            return {
              name: selectionProp.name,
              onClick: () => {
                setActiveDashboardDisplay(index);
              },
            };
          }),
        }}
      />
      {activeDashboardDisplay === -1 ? (
        <div>Loading...</div>
      ) : (
        <RenderDashboardDisplayComponent
          displayComponent={dashboardDisplaySelectionProps[activeDashboardDisplay].displayComponent}
          injectRef={activeDashboardDisplayRef}
        />
      )}
    </div>
  );
};

function RenderDashboardDisplayComponent({
  displayComponent,
  injectRef,
}: {
  displayComponent: ReactElement;
  injectRef: React.Ref<IDashboardRefreshable>;
}): ReactElement {
  const Component = displayComponent.type;

  // Forward the ref only if it's necessary
  return <Component {...displayComponent.props} ref={injectRef} />;
}

export default Dashboard;
