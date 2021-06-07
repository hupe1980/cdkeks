# API Reference

**Classes**

Name|Description
----|-----------
[AlbIngress](#cdkeks-albingress)|*No description*
[AwsCalicoAddon](#cdkeks-awscalicoaddon)|*No description*
[AwsLoadBalancerControllerAddon](#cdkeks-awsloadbalancercontrolleraddon)|*No description*
[Cdk8sConstruct](#cdkeks-cdk8sconstruct)|*No description*
[Deployment](#cdkeks-deployment)|*No description*
[IngressBackend](#cdkeks-ingressbackend)|*No description*
[LoadBalancer](#cdkeks-loadbalancer)|*No description*
[Namespace](#cdkeks-namespace)|*No description*
[NetworkLoadBalancer](#cdkeks-networkloadbalancer)|*No description*
[NginxIngressAddon](#cdkeks-nginxingressaddon)|*No description*
[Platform](#cdkeks-platform)|*No description*
[Service](#cdkeks-service)|*No description*
[ServiceAccount](#cdkeks-serviceaccount)|*No description*


**Structs**

Name|Description
----|-----------
[AlbIngressProps](#cdkeks-albingressprops)|*No description*
[AwsCalicoProps](#cdkeks-awscalicoprops)|*No description*
[AwsLoadBalancerControllerAddonProps](#cdkeks-awsloadbalancercontrolleraddonprops)|*No description*
[Cdk8sConstructProps](#cdkeks-cdk8sconstructprops)|*No description*
[DeploymentProps](#cdkeks-deploymentprops)|*No description*
[LoadBalancerProps](#cdkeks-loadbalancerprops)|*No description*
[NetworkLoadBalancerProps](#cdkeks-networkloadbalancerprops)|*No description*
[NginxIngressAddonProps](#cdkeks-nginxingressaddonprops)|*No description*
[PlatformProps](#cdkeks-platformprops)|*No description*
[ServiceAccountProps](#cdkeks-serviceaccountprops)|*No description*
[ServiceProps](#cdkeks-serviceprops)|*No description*


**Interfaces**

Name|Description
----|-----------
[IAddon](#cdkeks-iaddon)|*No description*
[INamespace](#cdkeks-inamespace)|*No description*


**Enums**

Name|Description
----|-----------
[BackendProtocol](#cdkeks-backendprotocol)|*No description*
[ServiceType](#cdkeks-servicetype)|*No description*
[TargetType](#cdkeks-targettype)|How to interpret the load balancing target identifiers.



## class AlbIngress  <a id="cdkeks-albingress"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IConnectable](#aws-cdk-aws-ec2-iconnectable)
__Extends__: [Cdk8sConstruct](#cdkeks-cdk8sconstruct)

### Initializer




```ts
new AlbIngress(scope: Construct, id: string, props: AlbIngressProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[AlbIngressProps](#cdkeks-albingressprops)</code>)  *No description*
  * **platform** (<code>[Platform](#cdkeks-platform)</code>)  *No description* 
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  *No description* __*Optional*__
  * **certificates** (<code>Array<[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)></code>)  Certificates to attach. __*Optional*__
  * **internetFacing** (<code>boolean</code>)  Whether the load balancer has an internet-routable address. __*Default*__: false
  * **ipAdressType** (<code>[IpAddressType](#aws-cdk-aws-elasticloadbalancingv2-ipaddresstype)</code>)  The type of IP addresses to use. __*Default*__: IpAddressType.Ipv4
  * **rules** (<code>Array<[IngressV1Beta1Rule](#cdk8s-plus-17-ingressv1beta1rule)></code>)  *No description* __*Optional*__
  * **securityGroup** (<code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code>)  Security Group to assign to this instance. __*Default*__: create new security group
  * **sslPolicy** (<code>[SslPolicy](#aws-cdk-aws-elasticloadbalancingv2-sslpolicy)</code>)  *No description* __*Default*__: SslPolicy.RECOMMENDED
  * **tags** (<code>Map<string, string></code>)  Tags that will be applied to AWS resources created. __*Optional*__
  * **targetType** (<code>[TargetType](#cdkeks-targettype)</code>)  *No description* __*Default*__: AlbTargetType.INSTANCE



### Properties


Name | Type | Description 
-----|------|-------------
**apiObject** | <code>[IngressV1Beta1](#cdk8s-plus-17-ingressv1beta1)</code> | <span></span>
**connections** | <code>[Connections](#aws-cdk-aws-ec2-connections)</code> | Allows specify security group connections for the instance.
**metadata** | <code>[ApiObjectMetadataDefinition](#cdk8s-apiobjectmetadatadefinition)</code> | <span></span>
**name** | <code>string</code> | <span></span>

### Methods


#### addRule(path, backend) <a id="cdkeks-albingress-addrule"></a>



```ts
addRule(path: string, backend: IngressV1Beta1Backend): void
```

* **path** (<code>string</code>)  *No description*
* **backend** (<code>[IngressV1Beta1Backend](#cdk8s-plus-17-ingressv1beta1backend)</code>)  *No description*




#### addSecurityGroup(securityGroup) <a id="cdkeks-albingress-addsecuritygroup"></a>

Add the security group to the instance.

```ts
addSecurityGroup(securityGroup: ISecurityGroup): void
```

* **securityGroup** (<code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code>)  : The security group to add.






## class AwsCalicoAddon  <a id="cdkeks-awscalicoaddon"></a>



__Implements__: [IAddon](#cdkeks-iaddon)

### Initializer




```ts
new AwsCalicoAddon(props?: AwsCalicoProps)
```

* **props** (<code>[AwsCalicoProps](#cdkeks-awscalicoprops)</code>)  *No description*
  * **version** (<code>string</code>)  *No description* __*Default*__: `0.3.5`



### Properties


Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | <span></span>
*static* **NAME** | <code>string</code> | <span></span>

### Methods


#### install(scope, platform) <a id="cdkeks-awscalicoaddon-install"></a>



```ts
install(scope: Construct, platform: Platform): void
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **platform** (<code>[Platform](#cdkeks-platform)</code>)  *No description*






## class AwsLoadBalancerControllerAddon  <a id="cdkeks-awsloadbalancercontrolleraddon"></a>



__Implements__: [IAddon](#cdkeks-iaddon)

### Initializer




```ts
new AwsLoadBalancerControllerAddon(props?: AwsLoadBalancerControllerAddonProps)
```

* **props** (<code>[AwsLoadBalancerControllerAddonProps](#cdkeks-awsloadbalancercontrolleraddonprops)</code>)  *No description*
  * **namespaceName** (<code>string</code>)  *No description* __*Default*__: `kube-system`
  * **version** (<code>string</code>)  *No description* __*Default*__: `1.2.0`



### Properties


Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | <span></span>
*static* **NAME** | <code>string</code> | <span></span>

### Methods


#### install(scope, platform) <a id="cdkeks-awsloadbalancercontrolleraddon-install"></a>



```ts
install(scope: Construct, platform: Platform): void
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **platform** (<code>[Platform](#cdkeks-platform)</code>)  *No description*






## class Cdk8sConstruct  <a id="cdkeks-cdk8sconstruct"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)
__Implemented by__: [AlbIngress](#cdkeks-albingress), [Deployment](#cdkeks-deployment), [LoadBalancer](#cdkeks-loadbalancer), [Namespace](#cdkeks-namespace), [NetworkLoadBalancer](#cdkeks-networkloadbalancer), [Service](#cdkeks-service), [ServiceAccount](#cdkeks-serviceaccount)

### Initializer




```ts
new Cdk8sConstruct(scope: Construct, id: string, props: Cdk8sConstructProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[Cdk8sConstructProps](#cdkeks-cdk8sconstructprops)</code>)  *No description*
  * **platform** (<code>[Platform](#cdkeks-platform)</code>)  *No description* 
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**chart** | <code>[Chart](#cdk8s-chart)</code> | <span></span>
**metadata** | <code>[ApiObjectMetadataDefinition](#cdk8s-apiobjectmetadatadefinition)</code> | <span></span>
**name** | <code>string</code> | <span></span>
**platform** | <code>[Platform](#cdkeks-platform)</code> | <span></span>

### Methods


#### protected onPrepare() <a id="cdkeks-cdk8sconstruct-onprepare"></a>

Perform final modifications before synthesis.

This method can be implemented by derived constructs in order to perform
final changes before synthesis. prepare() will be called after child
constructs have been prepared.

This is an advanced framework feature. Only use this if you
understand the implications.

```ts
protected onPrepare(): void
```







## class Deployment  <a id="cdkeks-deployment"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Cdk8sConstruct](#cdkeks-cdk8sconstruct)

### Initializer




```ts
new Deployment(scope: Construct, id: string, props: DeploymentProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[DeploymentProps](#cdkeks-deploymentprops)</code>)  *No description*
  * **platform** (<code>[Platform](#cdkeks-platform)</code>)  *No description* 
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  *No description* __*Optional*__
  * **containers** (<code>Array<[ContainerProps](#cdk8s-plus-17-containerprops)></code>)  *No description* __*Optional*__
  * **serviceAccount** (<code>[ServiceAccount](#aws-cdk-aws-eks-serviceaccount)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**apiObject** | <code>[Deployment](#cdk8s-plus-17-deployment)</code> | <span></span>
**containers** | <code>Array<[Container](#cdk8s-plus-17-container)></code> | <span></span>
**labelSelector** | <code>Map<string, string></code> | <span></span>
**metadata** | <code>[ApiObjectMetadataDefinition](#cdk8s-apiobjectmetadatadefinition)</code> | <span></span>
**name** | <code>string</code> | <span></span>

### Methods


#### expose(id, port, options?) <a id="cdkeks-deployment-expose"></a>



```ts
expose(id: string, port: number, options?: ExposeOptions): Service
```

* **id** (<code>string</code>)  *No description*
* **port** (<code>number</code>)  *No description*
* **options** (<code>[ExposeOptions](#cdk8s-plus-17-exposeoptions)</code>)  *No description*
  * **name** (<code>string</code>)  The name of the service to expose. __*Default*__: undefined Uses the system generated name.
  * **protocol** (<code>[Protocol](#cdk8s-plus-17-protocol)</code>)  The IP protocol for this port. __*Default*__: Protocol.TCP
  * **serviceType** (<code>[ServiceType](#cdk8s-plus-17-servicetype)</code>)  The type of the exposed service. __*Default*__: ClusterIP.
  * **targetPort** (<code>number</code>)  The port number the service will redirect to. __*Default*__: The port of the first container in the deployment (ie. containers[0].port)

__Returns__:
* <code>[Service](#cdkeks-service)</code>



## class IngressBackend  <a id="cdkeks-ingressbackend"></a>




### Initializer




```ts
new IngressBackend()
```



### Methods


#### *static* fromService(service, options?) <a id="cdkeks-ingressbackend-fromservice"></a>



```ts
static fromService(service: Service, options?: ServiceIngressV1BetaBackendOptions): IngressV1Beta1Backend
```

* **service** (<code>[Service](#cdkeks-service)</code>)  *No description*
* **options** (<code>[ServiceIngressV1BetaBackendOptions](#cdk8s-plus-17-serviceingressv1betabackendoptions)</code>)  *No description*
  * **port** (<code>number</code>)  The port to use to access the service. __*Default*__: if the service exposes a single port, this port will be used.

__Returns__:
* <code>[IngressV1Beta1Backend](#cdk8s-plus-17-ingressv1beta1backend)</code>



## class LoadBalancer  <a id="cdkeks-loadbalancer"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Service](#cdkeks-service)

### Initializer




```ts
new LoadBalancer(scope: Construct, id: string, props: LoadBalancerProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[LoadBalancerProps](#cdkeks-loadbalancerprops)</code>)  *No description*
  * **platform** (<code>[Platform](#cdkeks-platform)</code>)  *No description* 
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  *No description* __*Optional*__
  * **internal** (<code>boolean</code>)  *No description* 
  * **backendProtocal** (<code>[BackendProtocol](#cdkeks-backendprotocol)</code>)  *No description* __*Optional*__
  * **certificate** (<code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code>)  *No description* __*Optional*__
  * **sslPolicy** (<code>[SslPolicy](#aws-cdk-aws-elasticloadbalancingv2-sslpolicy)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**hostname** | <code>string</code> | <span></span>



## class Namespace  <a id="cdkeks-namespace"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [INamespace](#cdkeks-inamespace)
__Extends__: [Cdk8sConstruct](#cdkeks-cdk8sconstruct)

### Initializer




```ts
new Namespace(scope: Construct, id: string, props: Cdk8sConstructProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[Cdk8sConstructProps](#cdkeks-cdk8sconstructprops)</code>)  *No description*
  * **platform** (<code>[Platform](#cdkeks-platform)</code>)  *No description* 
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**apiObject** | <code>[Namespace](#cdkeks-namespace)</code> | <span></span>
**metadata** | <code>[ApiObjectMetadataDefinition](#cdk8s-apiobjectmetadatadefinition)</code> | <span></span>
**name** | <code>string</code> | <span></span>

### Methods


#### *static* fromNamespaceName(name) <a id="cdkeks-namespace-fromnamespacename"></a>



```ts
static fromNamespaceName(name: string): INamespace
```

* **name** (<code>string</code>)  *No description*

__Returns__:
* <code>[INamespace](#cdkeks-inamespace)</code>



## class NetworkLoadBalancer  <a id="cdkeks-networkloadbalancer"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Service](#cdkeks-service)

### Initializer




```ts
new NetworkLoadBalancer(scope: Construct, id: string, props: NetworkLoadBalancerProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[NetworkLoadBalancerProps](#cdkeks-networkloadbalancerprops)</code>)  *No description*
  * **platform** (<code>[Platform](#cdkeks-platform)</code>)  *No description* 
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  *No description* __*Optional*__
  * **internal** (<code>boolean</code>)  *No description* 




## class NginxIngressAddon  <a id="cdkeks-nginxingressaddon"></a>



__Implements__: [IAddon](#cdkeks-iaddon)

### Initializer




```ts
new NginxIngressAddon(props?: NginxIngressAddonProps)
```

* **props** (<code>[NginxIngressAddonProps](#cdkeks-nginxingressaddonprops)</code>)  *No description*
  * **namespaceName** (<code>string</code>)  *No description* __*Default*__: `nginx-ingress`
  * **version** (<code>string</code>)  *No description* __*Default*__: `3.6.6`



### Properties


Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | <span></span>
*static* **NAME** | <code>string</code> | <span></span>

### Methods


#### install(scope, platform) <a id="cdkeks-nginxingressaddon-install"></a>



```ts
install(scope: Construct, platform: Platform): void
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **platform** (<code>[Platform](#cdkeks-platform)</code>)  *No description*






## class Platform  <a id="cdkeks-platform"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new Platform(scope: Construct, id: string, props: PlatformProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[PlatformProps](#cdkeks-platformprops)</code>)  *No description*
  * **cluster** (<code>[ICluster](#aws-cdk-aws-eks-icluster)</code>)  *No description* 
  * **addons** (<code>Array<[IAddon](#cdkeks-iaddon)></code>)  *No description* __*Optional*__
  * **strict** (<code>boolean</code>)  *No description* __*Default*__: false;



### Properties


Name | Type | Description 
-----|------|-------------
**cluster** | <code>[ICluster](#aws-cdk-aws-eks-icluster)</code> | <span></span>
**strict** | <code>boolean</code> | <span></span>

### Methods


#### addAddon(addon) <a id="cdkeks-platform-addaddon"></a>



```ts
addAddon(addon: IAddon): void
```

* **addon** (<code>[IAddon](#cdkeks-iaddon)</code>)  *No description*




#### addCdk8sChart(id, chart) <a id="cdkeks-platform-addcdk8schart"></a>



```ts
addCdk8sChart(id: string, chart: Construct): KubernetesManifest
```

* **id** (<code>string</code>)  *No description*
* **chart** (<code>[Construct](#constructs-construct)</code>)  *No description*

__Returns__:
* <code>[KubernetesManifest](#aws-cdk-aws-eks-kubernetesmanifest)</code>

#### addHelmChart(id, options) <a id="cdkeks-platform-addhelmchart"></a>



```ts
addHelmChart(id: string, options: HelmChartOptions): HelmChart
```

* **id** (<code>string</code>)  *No description*
* **options** (<code>[HelmChartOptions](#aws-cdk-aws-eks-helmchartoptions)</code>)  *No description*
  * **chart** (<code>string</code>)  The name of the chart. 
  * **createNamespace** (<code>boolean</code>)  create namespace if not exist. __*Default*__: true
  * **namespace** (<code>string</code>)  The Kubernetes namespace scope of the requests. __*Default*__: default
  * **release** (<code>string</code>)  The name of the release. __*Default*__: If no release name is given, it will use the last 53 characters of the node's unique id.
  * **repository** (<code>string</code>)  The repository which contains the chart. __*Default*__: No repository will be used, which means that the chart needs to be an absolute URL.
  * **timeout** (<code>[Duration](#aws-cdk-core-duration)</code>)  Amount of time to wait for any individual Kubernetes operation. __*Default*__: Duration.minutes(5)
  * **values** (<code>Map<string, any></code>)  The values to be used by the chart. __*Default*__: No values are provided to the chart.
  * **version** (<code>string</code>)  The chart version to install. __*Default*__: If this is not specified, the latest version is installed
  * **wait** (<code>boolean</code>)  Whether or not Helm should wait until all Pods, PVCs, Services, and minimum number of Pods of a Deployment, StatefulSet, or ReplicaSet are in a ready state before marking the release as successful. __*Default*__: Helm will not wait before marking release as successful

__Returns__:
* <code>[HelmChart](#aws-cdk-aws-eks-helmchart)</code>

#### addManifest(id, ...manifest) <a id="cdkeks-platform-addmanifest"></a>



```ts
addManifest(id: string, ...manifest: Map<string, any>[]): KubernetesManifest
```

* **id** (<code>string</code>)  *No description*
* **manifest** (<code>Map<string, any></code>)  *No description*

__Returns__:
* <code>[KubernetesManifest](#aws-cdk-aws-eks-kubernetesmanifest)</code>



## class Service  <a id="cdkeks-service"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Cdk8sConstruct](#cdkeks-cdk8sconstruct)

### Initializer




```ts
new Service(scope: Construct, id: string, props: ServiceProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ServiceProps](#cdkeks-serviceprops)</code>)  *No description*
  * **platform** (<code>[Platform](#cdkeks-platform)</code>)  *No description* 
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  *No description* __*Optional*__
  * **ports** (<code>Array<[ServicePort](#cdk8s-plus-17-serviceport)></code>)  *No description* __*Optional*__
  * **type** (<code>[ServiceType](#cdkeks-servicetype)</code>)  *No description* __*Default*__: ServiceType.CLUSTER_IP



### Properties


Name | Type | Description 
-----|------|-------------
**apiObject** | <code>[Service](#cdk8s-plus-17-service)</code> | <span></span>
**metadata** | <code>[ApiObjectMetadataDefinition](#cdk8s-apiobjectmetadatadefinition)</code> | <span></span>
**name** | <code>string</code> | <span></span>
**ports** | <code>Array<[ServicePort](#cdk8s-plus-17-serviceport)></code> | <span></span>
**selector** | <code>Map<string, string></code> | <span></span>

### Methods


#### addDeployment(deployment, port, options?) <a id="cdkeks-service-adddeployment"></a>



```ts
addDeployment(deployment: Deployment, port: number, options?: ServicePortOptions): void
```

* **deployment** (<code>[Deployment](#cdkeks-deployment)</code>)  *No description*
* **port** (<code>number</code>)  *No description*
* **options** (<code>[ServicePortOptions](#cdk8s-plus-17-serviceportoptions)</code>)  *No description*
  * **name** (<code>string</code>)  The name of this port within the service. __*Optional*__
  * **nodePort** (<code>number</code>)  The port on each node on which this service is exposed when type=NodePort or LoadBalancer. __*Default*__: to auto-allocate a port if the ServiceType of this Service requires one.
  * **protocol** (<code>[Protocol](#cdk8s-plus-17-protocol)</code>)  The IP protocol for this port. __*Default*__: Protocol.TCP
  * **targetPort** (<code>number</code>)  The port number the service will redirect to. __*Default*__: The value of `port` will be used.




#### addSelector(label, value) <a id="cdkeks-service-addselector"></a>



```ts
addSelector(label: string, value: string): void
```

* **label** (<code>string</code>)  *No description*
* **value** (<code>string</code>)  *No description*






## class ServiceAccount  <a id="cdkeks-serviceaccount"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable), [IPrincipal](#aws-cdk-aws-iam-iprincipal), [IGrantable](#aws-cdk-aws-iam-igrantable)
__Extends__: [Cdk8sConstruct](#cdkeks-cdk8sconstruct)

### Initializer




```ts
new ServiceAccount(scope: Construct, id: string, props: ServiceAccountProps)
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ServiceAccountProps](#cdkeks-serviceaccountprops)</code>)  *No description*
  * **platform** (<code>[Platform](#cdkeks-platform)</code>)  *No description* 
  * **metadata** (<code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code>)  *No description* __*Optional*__
  * **secrets** (<code>Array<[ISecret](#cdk8s-plus-17-isecret)></code>)  *No description* __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**apiObject** | <code>[ServiceAccount](#cdk8s-plus-17-serviceaccount)</code> | <span></span>
**assumeRoleAction** | <code>string</code> | When this Principal is used in an AssumeRole policy, the action to use.
**grantPrincipal** | <code>[IPrincipal](#aws-cdk-aws-iam-iprincipal)</code> | The principal to grant permissions to.
**metadata** | <code>[ApiObjectMetadataDefinition](#cdk8s-apiobjectmetadatadefinition)</code> | <span></span>
**name** | <code>string</code> | <span></span>
**policyFragment** | <code>[PrincipalPolicyFragment](#aws-cdk-aws-iam-principalpolicyfragment)</code> | Return the policy fragment that identifies this principal in a Policy.
**role** | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | <span></span>

### Methods


#### addToPolicy(statement)⚠️ <a id="cdkeks-serviceaccount-addtopolicy"></a>

(deprecated) Add to the policy of this principal.

```ts
addToPolicy(statement: PolicyStatement): boolean
```

* **statement** (<code>[PolicyStatement](#aws-cdk-aws-iam-policystatement)</code>)  *No description*

__Returns__:
* <code>boolean</code>

#### addToPrincipalPolicy(statement) <a id="cdkeks-serviceaccount-addtoprincipalpolicy"></a>

Add to the policy of this principal.

```ts
addToPrincipalPolicy(statement: PolicyStatement): AddToPrincipalPolicyResult
```

* **statement** (<code>[PolicyStatement](#aws-cdk-aws-iam-policystatement)</code>)  *No description*

__Returns__:
* <code>[AddToPrincipalPolicyResult](#aws-cdk-aws-iam-addtoprincipalpolicyresult)</code>



## struct AlbIngressProps  <a id="cdkeks-albingressprops"></a>






Name | Type | Description 
-----|------|-------------
**platform** | <code>[Platform](#cdkeks-platform)</code> | <span></span>
**certificates**? | <code>Array<[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)></code> | Certificates to attach.<br/>__*Optional*__
**internetFacing**? | <code>boolean</code> | Whether the load balancer has an internet-routable address.<br/>__*Default*__: false
**ipAdressType**? | <code>[IpAddressType](#aws-cdk-aws-elasticloadbalancingv2-ipaddresstype)</code> | The type of IP addresses to use.<br/>__*Default*__: IpAddressType.Ipv4
**metadata**? | <code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code> | __*Optional*__
**rules**? | <code>Array<[IngressV1Beta1Rule](#cdk8s-plus-17-ingressv1beta1rule)></code> | __*Optional*__
**securityGroup**? | <code>[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)</code> | Security Group to assign to this instance.<br/>__*Default*__: create new security group
**sslPolicy**? | <code>[SslPolicy](#aws-cdk-aws-elasticloadbalancingv2-sslpolicy)</code> | __*Default*__: SslPolicy.RECOMMENDED
**tags**? | <code>Map<string, string></code> | Tags that will be applied to AWS resources created.<br/>__*Optional*__
**targetType**? | <code>[TargetType](#cdkeks-targettype)</code> | __*Default*__: AlbTargetType.INSTANCE



## struct AwsCalicoProps  <a id="cdkeks-awscalicoprops"></a>






Name | Type | Description 
-----|------|-------------
**version**? | <code>string</code> | __*Default*__: `0.3.5`



## struct AwsLoadBalancerControllerAddonProps  <a id="cdkeks-awsloadbalancercontrolleraddonprops"></a>






Name | Type | Description 
-----|------|-------------
**namespaceName**? | <code>string</code> | __*Default*__: `kube-system`
**version**? | <code>string</code> | __*Default*__: `1.2.0`



## struct Cdk8sConstructProps  <a id="cdkeks-cdk8sconstructprops"></a>






Name | Type | Description 
-----|------|-------------
**platform** | <code>[Platform](#cdkeks-platform)</code> | <span></span>
**metadata**? | <code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code> | __*Optional*__



## struct DeploymentProps  <a id="cdkeks-deploymentprops"></a>






Name | Type | Description 
-----|------|-------------
**platform** | <code>[Platform](#cdkeks-platform)</code> | <span></span>
**containers**? | <code>Array<[ContainerProps](#cdk8s-plus-17-containerprops)></code> | __*Optional*__
**metadata**? | <code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code> | __*Optional*__
**serviceAccount**? | <code>[ServiceAccount](#aws-cdk-aws-eks-serviceaccount)</code> | __*Optional*__



## interface IAddon  <a id="cdkeks-iaddon"></a>

__Implemented by__: [AwsCalicoAddon](#cdkeks-awscalicoaddon), [AwsLoadBalancerControllerAddon](#cdkeks-awsloadbalancercontrolleraddon), [NginxIngressAddon](#cdkeks-nginxingressaddon)



### Properties


Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | <span></span>

### Methods


#### install(scope, platform) <a id="cdkeks-iaddon-install"></a>



```ts
install(scope: Construct, platform: Platform): void
```

* **scope** (<code>[Construct](#constructs-construct)</code>)  *No description*
* **platform** (<code>[Platform](#cdkeks-platform)</code>)  *No description*






## interface INamespace  <a id="cdkeks-inamespace"></a>

__Implemented by__: [Namespace](#cdkeks-namespace)
__Obtainable from__: [Namespace](#cdkeks-namespace).[fromNamespaceName](#cdkeks-namespace#cdkeks-namespace-fromnamespacename)()



### Properties


Name | Type | Description 
-----|------|-------------
**name** | <code>string</code> | <span></span>



## struct LoadBalancerProps  <a id="cdkeks-loadbalancerprops"></a>






Name | Type | Description 
-----|------|-------------
**internal** | <code>boolean</code> | <span></span>
**platform** | <code>[Platform](#cdkeks-platform)</code> | <span></span>
**backendProtocal**? | <code>[BackendProtocol](#cdkeks-backendprotocol)</code> | __*Optional*__
**certificate**? | <code>[ICertificate](#aws-cdk-aws-certificatemanager-icertificate)</code> | __*Optional*__
**metadata**? | <code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code> | __*Optional*__
**sslPolicy**? | <code>[SslPolicy](#aws-cdk-aws-elasticloadbalancingv2-sslpolicy)</code> | __*Optional*__



## struct NetworkLoadBalancerProps  <a id="cdkeks-networkloadbalancerprops"></a>






Name | Type | Description 
-----|------|-------------
**internal** | <code>boolean</code> | <span></span>
**platform** | <code>[Platform](#cdkeks-platform)</code> | <span></span>
**metadata**? | <code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code> | __*Optional*__



## struct NginxIngressAddonProps  <a id="cdkeks-nginxingressaddonprops"></a>






Name | Type | Description 
-----|------|-------------
**namespaceName**? | <code>string</code> | __*Default*__: `nginx-ingress`
**version**? | <code>string</code> | __*Default*__: `3.6.6`



## struct PlatformProps  <a id="cdkeks-platformprops"></a>






Name | Type | Description 
-----|------|-------------
**cluster** | <code>[ICluster](#aws-cdk-aws-eks-icluster)</code> | <span></span>
**addons**? | <code>Array<[IAddon](#cdkeks-iaddon)></code> | __*Optional*__
**strict**? | <code>boolean</code> | __*Default*__: false;



## struct ServiceAccountProps  <a id="cdkeks-serviceaccountprops"></a>






Name | Type | Description 
-----|------|-------------
**platform** | <code>[Platform](#cdkeks-platform)</code> | <span></span>
**metadata**? | <code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code> | __*Optional*__
**secrets**? | <code>Array<[ISecret](#cdk8s-plus-17-isecret)></code> | __*Optional*__



## struct ServiceProps  <a id="cdkeks-serviceprops"></a>






Name | Type | Description 
-----|------|-------------
**platform** | <code>[Platform](#cdkeks-platform)</code> | <span></span>
**metadata**? | <code>[ApiObjectMetadata](#cdk8s-apiobjectmetadata)</code> | __*Optional*__
**ports**? | <code>Array<[ServicePort](#cdk8s-plus-17-serviceport)></code> | __*Optional*__
**type**? | <code>[ServiceType](#cdkeks-servicetype)</code> | __*Default*__: ServiceType.CLUSTER_IP



## enum BackendProtocol  <a id="cdkeks-backendprotocol"></a>



Name | Description
-----|-----
**HTTPS** |
**HTTP** |
**TCP** |
**SSL** |


## enum ServiceType  <a id="cdkeks-servicetype"></a>



Name | Description
-----|-----
**CLUSTER_IP** |
**NODE_PORT** |
**LOAD_BALANCER** |
**EXTERNAL_NAME** |


## enum TargetType  <a id="cdkeks-targettype"></a>

How to interpret the load balancing target identifiers.

Name | Description
-----|-----
**IP** |Targets identified by IP address.
**INSTANCE** |Targets identified by instance ID.


